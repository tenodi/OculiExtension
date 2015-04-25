// Event dispatcher! - gets message and dispatches it to event handlers
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	switch(request.key){

  		// APP EVENTS
  		case 'app-start':
  			hAppStart();
  			break;


  		// KEY EVENTS
  		case 'key-up':
  			oculiExtension.keyUp();
        // hKeyUp();
  			break;

  		case 'key-down':
        oculiExtension.keyDown();
  			// hKeyDown();
  			break;

  		case 'key-left':
  			oculiExtension.keyLeft();
  			break;

  		case 'key-right':
        oculiExtension.keyRight();
  			// hKeyRight();
  			break;

  		case 'key-enter':
  			hKeyEnter();
  			break;


  	}

 
 // debug     	
 //    console.log(sender.tab ?
 //                "from a content script:" + sender.tab.url :
 //                "from the extension");
 //    if (request.greeting == "hello")
 //      sendResponse({farewell: "goodbye"});
	}
);	




/**
*	Event handlers!
*		-- APP
*/
function hAppStart(){
	speak(retrieveText('app_start_explanation'));
	menuLevel = 1;
	menuItem = 1;
}


/** 
*	Event handlers!
*		-- KEYS
*/
function hKeyUp(){
  // if (state == )
}

function hKeyDown(){
}

function hKeyRight(){
}

function hKeyLeft(){
}

function hKeyEnter(){
}

