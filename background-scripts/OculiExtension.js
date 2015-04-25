/**
 * EventPage 
 * https://developer.chrome.com/extensions/event_pages
 * 
 * 	This page contains OculiExtension class along with some other global functions. 
 *	At the end, test can be found. 
 */





/**
 * Used as Object Constructor.
 * Defines prototype for OculiExtension object containing state of extension
 * and array for representing menu item!
 * 
 */
function OculiExtension(){
	/**
	 * Focused menu item. This represents path until focused menu item, with last
	 * item being last menu read. If we enter focused menu item [1], we'll end with
	 * [1, 0]. 1 represents top-most menu entered and last array item, 0, represents
	 * currently focused menu.
	 */
	this.currMenuItem = [0]; 
	this.getFocusedItem = function(){
		return this.currMenuItem[this.currMenuItem.length - 1];
	}
	this.setFocusedItem = function(newValue){
		this.currMenuItem[this.currMenuItem.length - 1] = newValue;
	}

	this.state = new NavigationState();

	this.changeState = function(newState){
		this.state = newState;
		newState.init(this);
	}

	this.keyUp = function(){
		this.state.keyUp(this);
	}
	this.keyDown = function(){
		this.state.keyDown(this);
	}
	this.keyLeft = function(){
		this.state.keyLeft(this);
	}
	this.keyRight = function(){
		this.state.keyRight(this);
	}
}

/**
 * Current menu chunk represents JSON EXTENSION_MENU part of down-most menu entered.
 * Since the last item in currMenuItem represents only the focused item, it's sliced.
 * If menuPath (currMenuItem without last item) has items, we extract and structure
 * menu like: EXTENSION_MENU.array[1].array[0]...
 * 
 * @return {Object} JSON EXTENSION_MENU part.
 */
OculiExtension.prototype.getCurrentMenuChunk = function() {
	var menuPath = this.currMenuItem.slice(0, this.currMenuItem.length - 1);
	var menuChunk = EXTENSION_MENU;

	if (menuPath.length > 0){
		for (var i = 0; i < menuPath.length; i++){
			menuChunk = menuChunk.array[menuPath[i]];
		}
	}

	return menuChunk;
};




var oculiExtension = new OculiExtension();



/** 
 * Speaks text defined by Oculi extension
 * @param {string} String's key
 */
function speakExtText(key, enqueue){
	speak(retrieveText(key), chrome.i18n.getUILanguage(), enqueue);
}

/**
 * Retrieves text with key from translation. Retrieving process
 * 		is described here: https://developer.chrome.com/extensions/i18n#locales-usage
 * @param {string} Strings'key
 * @return {string} Retrieved text
 */
function retrieveText(key){
	return chrome.i18n.getMessage(key);
}

/**
 * Speaks out text with correct pronounciation
 * @param {string} text Text to be spoken
 */
function speak(text, lang, enqueue){
	if (!enqueue){ // undefined is falsy value
		enqueue = false;
	}

	chrome.storage.local.get('rate', function(items){
		chrome.tts.speak(text, {'lang': lang, 'rate': Number(items.rate), 'enqueue': enqueue});
	});
}







// JQuery i Ajax pozivi!


// $.ajax({url: "http://www.example.com", success: function(result){
//     console.log(result);
//     speak(result);
// }});


// chrome.commands.onCommand.addListener(function(command) {

// 	switch (command){
// 		case 'on-off-application': 
// 			onOff();
// 			break;
// 		case 'left':
// 			left();
// 			break;
// 		case 'right':
// 			right();
// 			break;
// 		case 'enter':
// 			enter();
// 			break;
// 	}
// });






/**
 * TESTING CHROME API
 * 		This block is used to test Chrome API on start. To disable it,
 *		simply put false before block.
 */
if (false){

	/**
	 * i18n API
	 */
	chrome.i18n.getAcceptLanguages(function(array){
		console.log('Supported languages: ' + array);
	});

	console.log('UI language: ' + chrome.i18n.getUILanguage());



	/**
	 * tts API : https://developer.chrome.com/extensions/tts
	 */
	chrome.tts.getVoices(
	  function(voices) {
    	for (var i = 0; i < voices.length; i++) {
      console.log('Voice ' + i + ':');
      console.log('  name: ' + voices[i].voiceName);
      console.log('  lang: ' + voices[i].lang);
      console.log('  gender: ' + voices[i].gender);
      console.log('  extension id: ' + voices[i].extensionId);
      console.log('  event types: ' + voices[i].eventTypes);
    }
  });


}



      