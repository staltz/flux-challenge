module Main where

import Array exposing (Array)
import Effects exposing (Effects)
import Html exposing (Html, button, div, h1, h3, h6, li, text, ul)
import Html.Attributes exposing (class, classList, style)
import Html.Events exposing (onClick)
import Http
import Json.Decode as Json exposing ((:=))
import Maybe exposing (andThen)
import StartApp
import Task

--
-- Config
--

scrollSpeed = 2
nbSlots = 5

--
-- Wiring
--

app =
  StartApp.start
    { init = init darthSidious
    , update = update
    , view = view
    , inputs = [Signal.map SetWorld currentWorld]
    }

main =
  app.html

port tasks : Signal (Task.Task Effects.Never ())
port tasks =
  app.tasks

-- index.html creates a websocket and calls this port whenever a message is
-- received.
port currentWorld : Signal (Maybe World)

--
-- Models
--

type alias Model =
  { -- Obi-Wan's current location
    world:Maybe World
    -- The slots in view, which may contain dark jedis
  , jediSlots:Array (Maybe Jedi)
    -- Current scroll position. When we fire off a request to fetch a new jedi,
    -- we store the current index of the slot in which to inject the new jedi as
    -- well as the current scroll position. When the request completes, the
    -- index is adjusted for any scrolling which happened since the request
    -- started.
  , scrollPos:Int
  , jediRequests:List JediRequest
  , nextRequestId:Int
  }

type alias World =
  { id:Int
  , name:String
  }

type alias Jedi =
  { id:Int
  , name:String
  , homeworld:World
  , master:Maybe JediUrl
  , apprentice:Maybe JediUrl
  }

type alias JediUrl =
  { id:Int
  , url:String
  }

type alias JediRequest =
  { id:Int
  , insertPos:Int
  , scrollPos:Int
  , abort:Effects Action}

darthSidious : JediUrl
darthSidious =
  { id=3616
  , url="http://localhost:3000/dark-jedis/3616"
  }

init : JediUrl -> (Model, Effects Action)
init jediUrl =
  fetchJedi initModel (nbSlots // 2) jediUrl

initModel : Model
initModel =
  { world = Nothing
  , jediSlots = Array.repeat nbSlots Nothing
  , scrollPos = 0
  , jediRequests = []
  , nextRequestId = 0
  }

--
-- Actions
--

type ScrollDir
  = Up
  | Down

type Action
  = SetWorld (Maybe World)
  | SetJedi JediRequest
            (Maybe Jedi)
  | Scroll ScrollDir
  | NoAction

--
-- Update
--

adjustPos : Int -> Int -> Int -> Int
adjustPos pos oldScrollPos newScrollPos =
  let offset = oldScrollPos - newScrollPos
  in pos + offset

removeRequest : JediRequest -> List JediRequest -> List JediRequest
removeRequest request requests =
  List.filter (\ r -> r /= request) requests

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    SetJedi request newJedi ->
      -- We adjust the position in which to inject the new jedi to account for
      -- any scrolling that's been done since the jedi was requested.
      let adjustedPos =
            adjustPos request.insertPos
                      request.scrollPos
                      model.scrollPos
          newJediSlots =
            if inBounds adjustedPos model.jediSlots
              then Array.set adjustedPos newJedi model.jediSlots
              -- Don't update the model if this jedi has been scrolled off-screen.
              else model.jediSlots
          model' = { model | jediRequests <- removeRequest request model.jediRequests
                           , jediSlots <- newJediSlots }
      in maybeFetchJedisAround model' adjustedPos

    SetWorld mWorld ->
      ( { model | world <- mWorld }
      , Effects.none
      )

    Scroll dir ->
      if not (canScroll dir model.jediSlots)
        then (model, Effects.none)
        else
          let slotsLength = Array.length model.jediSlots
              emptySlots = Array.repeat scrollSpeed Nothing
              getRequestsToAbort newScrollPos =
                  List.partition (\ request ->
                                      (inBounds (adjustPos request.insertPos
                                                           request.scrollPos
                                                           newScrollPos)
                                                model.jediSlots))
                                 model.jediRequests
          in
            case dir of
              Up ->
                let newJedis = Array.slice 0 (slotsLength - scrollSpeed) model.jediSlots
                    firstJedi = Array.get 0 model.jediSlots
                    newScrollPos = model.scrollPos - scrollSpeed
                    (newRequests, requestsToAbort) = getRequestsToAbort newScrollPos
                    aborts = List.map .abort requestsToAbort
                    model' = { model | jediSlots <- Array.append emptySlots newJedis
                                       , scrollPos <- newScrollPos }
                in
                  case firstJedi `andThen` flip andThen .master of
                      Nothing ->
                        (model', Effects.none)
                      Just master ->
                        let (model'', send) =
                              fetchJedi model'
                                        (scrollSpeed - 1)
                                        master
                        in
                          ( model''
                          , Effects.batch (List.append aborts [send])
                          )
              Down ->
                let newJedis = Array.slice scrollSpeed slotsLength model.jediSlots
                    lastJedi = Array.get (slotsLength - 1) model.jediSlots
                    newScrollPos = model.scrollPos + scrollSpeed
                    (newRequests, requestsToAbort) = getRequestsToAbort newScrollPos
                    aborts = List.map .abort requestsToAbort
                    model' = { model | jediSlots <- Array.append newJedis emptySlots
                                     , scrollPos <- newScrollPos }
                in
                  case lastJedi `andThen` flip andThen .apprentice of
                      Nothing ->
                        (model', Effects.none)
                      Just apprentice ->
                        let (model'', send) = fetchJedi model'
                                              (slotsLength - scrollSpeed)
                                              apprentice
                        in
                          ( model''
                          , Effects.batch (List.append aborts [send])
                          )
    NoAction -> (model, Effects.none)

--
-- Lib
--

inBounds : Int -> Array x -> Bool
inBounds pos slots =
  pos >= 0 && pos < Array.length slots

notNothing : Maybe x -> Bool
notNothing maybe =
  case maybe of
    Nothing -> False
    Just _  -> True

isNothing : Maybe x -> Bool
isNothing = not << notNothing

-- Naive Array.any
any : (a -> Bool) -> Array a -> Bool
any pred array = Array.length (Array.filter pred array) > 0

-- Maybe.map2
-- from elm-lang/core 3.0.0
mMap2 : (a -> b -> value) -> Maybe a -> Maybe b -> Maybe value
mMap2 func ma mb =
  case (ma,mb) of
    (Just a, Just b) -> Just (func a b)
    _ -> Nothing

--
-- Helpers
--

fetchJedi : Model -> Int -> JediUrl -> (Model, Effects Action)
fetchJedi model insertPos {url} =
  let (sendTask, abortTask) =
        Http.getWithAbort decodeJedi url

      abortEffect =
        abortTask
          |> Task.toMaybe
          |> Task.map (\_ -> NoAction)
          |> Effects.task

      request =
        { id = model.nextRequestId
        , insertPos = insertPos
        , scrollPos = model.scrollPos
        , abort = abortEffect }

      sendEffect =
        sendTask
          |> Task.toMaybe
          |> Task.map (SetJedi request)
          |> Effects.task

  in
    ( { model | jediRequests <- request :: model.jediRequests
              , nextRequestId <- model.nextRequestId + 1 }
    , sendEffect )

haveJediAt : Int -> Model -> Bool
haveJediAt pos {jediSlots} = Array.get pos jediSlots /= Just Nothing

needJediAt : Int -> Model -> Bool
needJediAt pos model =
  inBounds pos model.jediSlots && not (haveJediAt pos model)

-- Check whether we have jedis around the jedi at `pos`, and fetch them if we
-- don't
maybeFetchJedisAround : Model -> Int -> (Model, Effects Action)
maybeFetchJedisAround model pos =
  let (model' , effects)  = maybeFetchJedi model  pos (pos - 1) .master
      (model'', effects') = maybeFetchJedi model' pos (pos + 1) .apprentice
  in (model'', Effects.batch [effects, effects'])

maybeFetchJedi : Model -> Int -> Int -> (Jedi -> Maybe JediUrl) -> (Model, Effects Action)
maybeFetchJedi model pos nextPos getNextUrl =
  let
    mNext =
      if needJediAt nextPos model
        then Array.get pos model.jediSlots `andThen` flip andThen getNextUrl
        else Nothing
  in
    case mNext of
      Just nextUrl ->
        fetchJedi model nextPos nextUrl
      Nothing ->
        (model, Effects.none)

-- Return True if the first (last) jedi in the list has an apprentice (master)
-- AND we would have at least one jedi in view after the scroll
canScroll : ScrollDir -> Array (Maybe Jedi) -> Bool
canScroll upOrDown jediSlots =
  let loadedJedis = Array.filter notNothing jediSlots
      (firstOrLast, apprenticeOrMaster) =
        case upOrDown of
          Up ->
            ( Array.get 0
            , .master)
          Down ->
            ( (\jedis -> Array.get (Array.length jedis - 1) jedis)
            , .apprentice)
      mJedi = firstOrLast loadedJedis
      next = mJedi `andThen` (flip andThen apprenticeOrMaster)
      jediInView = jediSlots
                     |> (case upOrDown of
                           Up -> Array.slice 0 -scrollSpeed
                           Down -> Array.slice scrollSpeed (Array.length jediSlots))
                     |> any notNothing
  in notNothing next && jediInView

onWorld : Maybe Jedi -> Maybe World -> Bool
onWorld mJedi mWorld =
  case mMap2 (,) mWorld mJedi of
    Just (world, jedi) ->
      jedi.homeworld.id == world.id
    Nothing -> False

--
-- Views
--

view : Signal.Address Action -> Model -> Html
view address {world, jediSlots} =
  div [ class "css-root" ]
    [ viewPlanetMonitor world
    , viewJediList address jediSlots world
    ]

viewPlanetMonitor : Maybe World -> Html
viewPlanetMonitor mWorld =
  h1 [ class "css-planet-monitor" ]
    [ text ("Obi-Wan currently "
            ++
            (case mWorld of
               Just {name} -> "on " ++ name
               Nothing -> "in transit"))
    ]

viewJediList : Signal.Address Action -> Array (Maybe Jedi) -> Maybe World -> Html
viewJediList address jediSlots mWorld =
    div [ class "css-scrollable-list" ]
      [ ul [ class "css-slots" ]
          (List.map (viewJedi mWorld)
                    (Array.toList jediSlots))
      , viewScrollButtons address jediSlots mWorld
      ]

viewJedi : Maybe World -> Maybe Jedi -> Html
viewJedi mWorld mJedi =
  li
    [ class "css-slot"
    , style (if mJedi `onWorld` mWorld
               then [("color", "red")]
               else [])
    ]
    (case mJedi of
       Nothing -> []
       Just jedi ->
         [ h3 [] [ text jedi.name ]
         , h6 [] [ text jedi.homeworld.name ]
         ]
    )

viewScrollButtons : Signal.Address Action -> Array (Maybe Jedi) -> Maybe World -> Html
viewScrollButtons address jediSlots mWorld =
  let scrollDisabled = any (flip onWorld mWorld) jediSlots
  in
    div [ class "css-scroll-buttons" ]
      (List.map (viewScrollButton address)
                [ (Up, "css-button-up", not scrollDisabled && canScroll Up jediSlots)
                , (Down, "css-button-down", not scrollDisabled && canScroll Down jediSlots)
                ])

viewScrollButton : Signal.Address Action -> (ScrollDir, String, Bool) -> Html
viewScrollButton address (dir, className, enabled) =
  button
    (classList [ (className, True)
               , ("css-button-disabled", not enabled)
               ]
    :: if enabled
       then [onClick address (Scroll dir)]
       else [])
    []

--
-- Decoders
--

decodeJedi : Json.Decoder Jedi
decodeJedi =
  Json.object5 Jedi
    ("id" := Json.int)
    ("name" := Json.string)
    ("homeworld" := decodeWorld)
    ("master" := decodeJediUrl)
    ("apprentice" := decodeJediUrl)

decodeWorld : Json.Decoder World
decodeWorld =
  Json.object2 World
    ("id" := Json.int)
    ("name" := Json.string)

-- If id is null return Nothing, otherwise return a JediUrl
decodeJediUrl : Json.Decoder (Maybe JediUrl)
decodeJediUrl =
  ("id" := (Json.oneOf
              [ Json.map Just Json.int
              , Json.null Nothing
              ]))
  `Json.andThen`
    (\mId ->
       case mId of
         Just id ->
           Json.object1 (\url -> Just (JediUrl id url))
             ("url" := Json.string)
         Nothing ->
           -- id was null, return Nothing
           Json.succeed Nothing)
