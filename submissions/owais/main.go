package main

import (
	"github.com/owais/flux-challenge/jedis"
	"github.com/owais/flux-challenge/planets"
	"github.com/owais/flux-challenge/scroller"
	"honnef.co/go/js/dom"
)

func main() {
	dom.GetWindow().Document().QuerySelector(".app-container").SetInnerHTML(`
        <div class="css-root">
            <h1 class="css-planet-monitor"></h1>
            <section class="css-scrollable-list">
                <ul class="css-slots"></ul>
				<div class="css-scroll-buttons">
					<button class="css-button-up css-button-disabled"></button>
					<button class="css-button-down css-button-disabled"></button>
				</div>
            </section>
        </div>
	`)
	planetChannel := planets.MakePlanetIndicator()
	scrollLockChannel, scrollChannel := jedis.MakeJediList(planetChannel)
	scroller.MakeButtons(scrollLockChannel, scrollChannel)
}
