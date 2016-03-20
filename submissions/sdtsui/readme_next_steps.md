X Build process: :: 

X test if the rendering logic works
X test if the fetching logic works

X handle movement: rerendering only
X handle movement: cancelling requests 
  // dashboard calls cancelAllPending on sithList...
    X sithList invokes on all. How could composition work???
X handle movement: retriggering fetching
  // OPT1: have a mediator in dashboard that listens for a 
  // OPT2: the shift function has side efects, but we can also get it to return a value...keep the logic in there. This is messy though. 
X offbutton logic.
  // High level: 
    XALL OFF: on match events. 
    XOne off on edge events.
    X(Both, if would have been active) X-> on ">1 sith loaded.css-slots"
__________________________________________________________ 
Refctor work into `spike`!
__________________________________________________________ 

TEST LOGIC:
  XMovement
  XRendering
  XCancelling:



X reXhook socket
- last: handle planetMatches from Dashboard
- Display, style buttons, ui freezing
