package planets

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/gopherjs/websocket"
	"honnef.co/go/js/dom"
)

var document = dom.GetWindow().Document()

type Planet struct {
	*js.Object
	ID   int    `js:"id"`
	Name string `js:"name"`
}

func MakePlanetIndicator() chan *Planet {
	planetChannel := make(chan *Planet)
	internalChannel := make(chan *Planet)
	watchCurrentPlanet([]chan *Planet{internalChannel, planetChannel})
	go onUpdate(internalChannel)
	return planetChannel
}

func watchCurrentPlanet(channels []chan *Planet) {
	ws, err := websocket.New("ws://localhost:4000/")
	if err != nil {
		panic(err)
	}
	ws.AddEventListener("message", false, func(ev *js.Object) {
		go func() {
			data := js.Global.Get("JSON").Call("parse", ev.Get("data"))
			planet := &Planet{
				Object: data,
			}
			for _, ch := range channels {
				ch <- planet
			}
		}()
	})
}

func onUpdate(channel chan *Planet) {
	for {
		planet := <-channel
		el := dom.GetWindow().Document().QuerySelector(".css-planet-monitor")
		el.SetTextContent("Obi-wan currently on " + planet.Name)
	}
}
