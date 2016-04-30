package scroller

import "honnef.co/go/js/dom"

var document = dom.GetWindow().Document()

func MakeButtons(scrollLockChannel chan [2]bool, scrollChannel chan int) {

	lockUp := true
	lockDown := true

	up := document.QuerySelector(".css-button-up")
	up.AddEventListener("click", false, func(event dom.Event) {
		if !lockUp {
			scrollChannel <- 2
		}
	})

	down := document.QuerySelector(".css-button-down")
	down.AddEventListener("click", false, func(event dom.Event) {
		if !lockDown {
			scrollChannel <- -2
		}
	})

	for {
		locks := <-scrollLockChannel
		lockUp = locks[0]
		lockDown = locks[1]

		if lockUp {
			up.Class().Add("css-button-disabled")
		} else {
			up.Class().Remove("css-button-disabled")
		}

		if lockDown {
			down.Class().Add("css-button-disabled")
		} else {
			down.Class().Remove("css-button-disabled")
		}
	}
}
