package jedis

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"honnef.co/go/js/dom"

	"github.com/gopherjs/gopherjs/js"
	"github.com/owais/flux-challenge/planets"
)

var document = dom.GetWindow().Document()

type link struct {
	*js.Object
	Id int `js:"id"`
}

type jedi struct {
	*js.Object
	ID         int            `js:"id"`
	Name       string         `js:"name"`
	Home       planets.Planet `js:"homeworld"`
	Master     link           `js:"master"`
	Apprentice link           `js:"apprentice"`
}

type jediList struct {
	planet *planets.Planet
	jedis  [5]jedi

	planetChannel     chan *planets.Planet
	requestsChannel   chan int
	responseChannel   chan jedi
	refreshChannel    chan bool
	scrollChannel     chan int
	scrollLockChannel chan [2]bool
}

func MakeJediList(planetChannel chan *planets.Planet) (chan [2]bool, chan int) {

	list := &jediList{
		planetChannel:     planetChannel,
		refreshChannel:    make(chan bool),
		scrollLockChannel: make(chan [2]bool),
		requestsChannel:   make(chan int),
		responseChannel:   make(chan jedi),
		scrollChannel:     make(chan int),
	}

	go list.onPlanetChange()
	go list.onResponse()
	go list.onRequest()
	go list.onScroll()
	go list.onRefresh()
	list.requestsChannel <- 3616
	return list.scrollLockChannel, list.scrollChannel
}

func (list *jediList) lockScrollIfNeeded() {
	lockUp := true
	lockDown := true
	for _, jd := range list.jedis {
		if jd.Object != nil {
			lockUp = false
			lockDown = false
			if list.planet.ID == jd.Home.ID {
				lockUp = true
				lockDown = true
				break
			}
			if jd.Master.Id == 0 {
				lockUp = true
				break
			}

			if jd.Apprentice.Id == 0 {
				lockDown = true
				break
			}
		}
	}
	list.scrollLockChannel <- [2]bool{lockUp, lockDown}
}

func (list *jediList) onRefresh() {
	for {
		<-list.refreshChannel
		list.render()
		list.lockScrollIfNeeded()
	}
}

func (list *jediList) onPlanetChange() {
	for {
		planet := <-list.planetChannel
		list.planet = planet
		list.refreshChannel <- true
	}
}

func (list *jediList) onResponse() {
	for {
		new := <-list.responseChannel
		isEmpty := true
		index := -1
		for i, jd := range list.jedis {
			if jd.Object != nil {
				isEmpty = false
				if new.ID == jd.Apprentice.Id {
					index = i + 1
					break
				} else if new.ID == jd.Master.Id {
					index = i - 1
					break
				}
			}
		}
		if index > -1 && index < 5 {
			list.jedis[index] = new
		} else if isEmpty {
			list.jedis[2] = new
		}
		list.refreshChannel <- true
		go list.fetchSurrounding(new)
	}
}

func (list *jediList) onRequest() {
	for {
		jediID := <-list.requestsChannel

		go func(id int) {
			resp, _ := http.Get(fmt.Sprintf("http://localhost:3000/dark-jedis/%d", id))
			defer resp.Body.Close()

			contents, _ := ioutil.ReadAll(resp.Body)
			data := js.Global.Get("JSON").Call("parse", string(contents))

			jedi := jedi{
				Object: data,
			}

			list.responseChannel <- jedi
		}(jediID)
	}
}

func (list *jediList) onScroll() {
	for {
		offset := <-list.scrollChannel
		newJedis := [5]jedi{}
		if offset != 0 {
			for i := 0; i < 5; i++ {
				withOffset := i + offset
				if withOffset >= 0 && withOffset < 5 {
					newJedis[withOffset] = list.jedis[i]
				}
			}
			list.jedis = newJedis
			list.refreshChannel <- true

			for _, jd := range list.jedis {
				if jd.Object != nil {
					go list.fetchSurrounding(jd)
				}
			}
		}
	}
}

func (list *jediList) fetchSurrounding(jd jedi) {
	index := list.index(jd.ID)
	if index > 0 && index < 4 {
		next := list.jedis[index+1]
		if next.Object == nil && jd.Apprentice.Id != 0 {
			list.requestsChannel <- jd.Apprentice.Id
		}

		prev := list.jedis[index-1]
		if prev.Object == nil && jd.Master.Id != 0 {
			list.requestsChannel <- jd.Master.Id
		}
	}
}

func (list *jediList) index(id int) int {
	for i, jd := range list.jedis {
		if jd.Object != nil && jd.ID == id {
			return i
		}
	}
	return -1
}

func (list *jediList) render() {
	elements := ""
	for _, jd := range list.jedis {
		if jd.Object != nil {
			color := ""
			if jd.Home.ID == list.planet.ID {
				color = "red"
			}
			elements += fmt.Sprintf(`<li class="css-slot" style="color:%s;">
				<h3>%s</h3>
				<h6>Homeworld: %s</h6>
			</li>`, color, jd.Name, jd.Home.Name)
		} else {
			elements += `<li class="css-slot"></li>`
		}
	}
	document.QuerySelector(".css-slots").SetInnerHTML(elements)
}
