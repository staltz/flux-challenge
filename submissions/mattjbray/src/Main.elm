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
  { world:Maybe World
  , jedis:Array (Maybe Jedi)
  , scrollPos:Int
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

darthSidious : JediUrl
darthSidious =
  { id=3616
  , url="http://localhost:3000/dark-jedis/3616"
  }

init : JediUrl -> (Model, Effects Action)
init jediUrl =
  ( { world = Nothing
    , jedis = Array.repeat 5 Nothing
    , scrollPos = 0
    }
  , fetchJedi 0 0 jediUrl
  )

--
-- Actions
--

type Action
  = SetWorld (Maybe World)
  | SetJedi Int Int (Maybe Jedi)
  | ScrollUp
  | ScrollDown

--
-- Update
--

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    SetJedi pos oldScrollPos newJedi ->
      -- We adjust the position in which to inject the new jedi according to any
      -- scrolling that's been done since the jedi was requested.
      let offset = oldScrollPos - model.scrollPos
          adjustedPos = pos + offset
      in
        ( if inBounds adjustedPos model.jedis
            then { model | jedis <- Array.set adjustedPos newJedi model.jedis }
            else model
          -- fill the next/previous slot if it's empty
        , Effects.batch
            [ maybeFetchNextJedi adjustedPos newJedi model.jedis model.scrollPos
            , maybeFetchPrevJedi adjustedPos newJedi model.jedis model.scrollPos
            ]
        )

    SetWorld mWorld ->
      ( { model | world <- mWorld }
      , Effects.none
      )

    ScrollUp ->
      let newJedis = Array.slice 0 (Array.length model.jedis - 2) model.jedis
          firstJedi = Array.get 0 model.jedis
          newScrollPos = model.scrollPos - 2
      in
        ( { model | jedis <- Array.append (Array.repeat 2 Nothing) newJedis
                  , scrollPos <- newScrollPos }
        , case firstJedi `andThen` flip andThen .master of
            Nothing ->
              Effects.none
            Just master ->
              fetchJedi 1 newScrollPos master
        )

    ScrollDown ->
      let newJedis = Array.slice 2 (Array.length model.jedis) model.jedis
          lastJedi = Array.get (Array.length model.jedis - 1) model.jedis
          newScrollPos = model.scrollPos + 2
      in
        ( { model | jedis <- Array.append newJedis (Array.repeat 2 Nothing)
                  , scrollPos <- newScrollPos }
        , case lastJedi `andThen` flip andThen .apprentice of
            Nothing ->
              Effects.none
            Just apprentice ->
              fetchJedi (Array.length model.jedis - 2)
                        newScrollPos
                        apprentice
        )


--
-- Helpers
--

fetchJedi : Int -> Int -> JediUrl -> Effects Action
fetchJedi pos currentScrollPos {url} =
  Http.get decodeJedi url
    |> Task.toMaybe
    |> Task.map (SetJedi pos currentScrollPos)
    |> Effects.task

inBounds : Int -> Array (Maybe Jedi) -> Bool
inBounds pos jedis =
  pos >= 0 && pos < Array.length jedis

maybeFetchJedi : Int -> (Jedi -> Maybe JediUrl) -> Maybe Jedi -> Array (Maybe Jedi) -> Int -> Effects Action
maybeFetchJedi pos apprenticeOrMaster currentMJedi jedis currentScrollPos =
  if | not (inBounds pos jedis) ->
         Effects.none
     | Array.get pos jedis /= Just Nothing ->
         -- already have a jedi in that position
         Effects.none
     | otherwise ->
         case currentMJedi `andThen` apprenticeOrMaster of
           Nothing ->
             Effects.none
           Just jediUrl ->
             fetchJedi pos currentScrollPos jediUrl

maybeFetchNextJedi : Int -> Maybe Jedi -> Array (Maybe Jedi) -> Int -> Effects Action
maybeFetchNextJedi currentPos =
  maybeFetchJedi (currentPos + 1) .apprentice

maybeFetchPrevJedi : Int -> Maybe Jedi -> Array (Maybe Jedi) -> Int -> Effects Action
maybeFetchPrevJedi currentPos =
  maybeFetchJedi (currentPos - 1) .master

notNothing : Maybe x -> Bool
notNothing maybe =
  case maybe of
    Nothing -> False
    Just _  -> True

-- Does the first Jedi have an apprentice?
canScrollUp : Array (Maybe Jedi) -> Bool
canScrollUp jedis =
  let loadedJedis = List.filter notNothing (Array.toList jedis)
      firstJedi = List.head loadedJedis
      master = firstJedi `andThen` (flip andThen .master)
  in notNothing master

-- Does the last Jedi have an apprentice?
canScrollDown : Array (Maybe Jedi) -> Bool
canScrollDown jedis =
  let loadedJedis = List.filter notNothing (Array.toList jedis)
      lastJedi = Array.get (List.length loadedJedis - 1) (Array.fromList loadedJedis)
      apprentice = lastJedi `andThen` (flip andThen .apprentice)
  in notNothing apprentice

-- from elm-lang/core 3.0.0
mMap2 : (a -> b -> value) -> Maybe a -> Maybe b -> Maybe value
mMap2 func ma mb =
  case (ma,mb) of
    (Just a, Just b) -> Just (func a b)
    _ -> Nothing

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
view address {world, jedis} =
  div [class "css-root"]
      [ viewPlanetMonitor world
      , viewJediList address jedis world
      ]

viewPlanetMonitor : Maybe World -> Html
viewPlanetMonitor mWorld =
  h1
    [class "css-planet-monitor"]
        [ text ("Obi-Wan currently "
                ++
                (case mWorld of
                   Just {name} -> "on " ++ name
                   Nothing -> "in transit"))
        ]

viewJediList : Signal.Address Action -> Array (Maybe Jedi) -> Maybe World -> Html
viewJediList address jedis mWorld =
  let scrollDisabled = List.any (flip onWorld mWorld) (Array.toList jedis)
  in
    div
      [ class "css-scrollable-list" ]
      [ ul
          [class "css-slots"]
          (List.map (viewJedi mWorld) (Array.toList jedis))
      , viewScrollButtons
          address
          (not scrollDisabled && canScrollUp jedis)
          (not scrollDisabled && canScrollDown jedis)
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

viewScrollButtons : Signal.Address Action -> Bool -> Bool -> Html
viewScrollButtons address upEnabled downEnabled =
  div
    [ class "css-scroll-buttons" ]
    [ button
        (classList [ ("css-button-up", True)
                   , ("css-button-disabled", not upEnabled)
                   ]
        :: if upEnabled
             then [onClick address ScrollUp]
             else [])
        []
    , button
        (classList [ ("css-button-down", True)
                   , ("css-button-disabled", not downEnabled)
                   ]
         :: if downEnabled
              then [onClick address ScrollDown]
              else [])
        []
    ]

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
