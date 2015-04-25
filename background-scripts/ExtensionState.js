/** 
 * Extension state.
 * @interface
 */

function ExtenstionState(){
	
	var doNothing = function(oculiExtension){};

	this.init = doNothing;
	this.keyUp = doNothing;
	this.keyDown = doNothing;
	this.keyLeft = doNothing;
	this.keyRight = doNothing;
}


/**
 * Implementation of ExtensionState
 */
function NavigationState(){}
NavigationState.prototype = new ExtenstionState();

/**
 * Subtracts 1 from menuItem with rotating positions and speaks out the navigation item.
 */
NavigationState.prototype.keyUp = function(oculiExtension) {
	var menuChunk = oculiExtension.getCurrentMenuChunk();
	var menuItems = menuChunk.array.length;

	var focusedItem = oculiExtension.getFocusedItem();
	focusedItem += menuItems - 1;
	focusedItem %= menuItems;
	oculiExtension.setFocusedItem(focusedItem);

	speakExtText(menuChunk.array[focusedItem].key);

};

NavigationState.prototype.keyDown = function(oculiExtension) {
	var menuChunk = oculiExtension.getCurrentMenuChunk();
	var menuItems = menuChunk.array.length;

	var focusedItem = oculiExtension.getFocusedItem();
	focusedItem += 1;
	focusedItem %= menuItems;
	oculiExtension.setFocusedItem(focusedItem);

	speakExtText(menuChunk.array[focusedItem].key);
};


NavigationState.prototype.keyRight = function(oculiExtension){
	var menuChunk = oculiExtension.getCurrentMenuChunk();
	var focusedItem = oculiExtension.getFocusedItem();

	if (menuChunk.array[focusedItem].array){

		oculiExtension.currMenuItem.push(0);
		speakExtText(menuChunk.array[focusedItem].array[0].key);

	// if it doesn't have array, it's an action. Now we need to switch based on function name
	} else {

		switch (menuChunk.array[focusedItem].action){
			case MENU_POPULO_NAVIGATION:
				oculiExtension.changeState(new PopuloNavigationState());
				break;
		}
	}
}


// TODO ovdje jos moras implementirati za slucaj da se provjeri da ne ode izvan aplikacije!

NavigationState.prototype.keyLeft = function(oculiExtension){
	oculiExtension.currMenuItem.pop();
	var menuChunk = oculiExtension.getCurrentMenuChunk();
	var focusedItem = oculiExtension.getFocusedItem();
	speakExtText(menuChunk.array[focusedItem].key);

}
