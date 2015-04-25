/**
 * Implementation of ExtensionState
 */
function PopuloNavigationState(){
	this.currMenu = {}
	this.currMenuItem = 0;
}


PopuloNavigationState.prototype = new ExtenstionState();

PopuloNavigationState.prototype.init = function(oculiExtension){
	// TODO refactor
	var populo = this; // we do this, so we can get it in ajax call!
	
	oculiExtension.currMenuItem = 0; // this represents LEVEL now, and menu item is in PopuloNavigationState
	speakExtText('loading');

	$.ajax(
		HOSTNAME + this.getMenuItem(oculiExtension).path, // na početku ne treba nikakav dodatan parametar slati, jer znamo da dohvaćamo samo sve zajednice
		{
			method: 'GET',
		}
	).done(function(json){
		populo.currMenu = json;
		speakExtText(populo.getMenuItem(oculiExtension).start, true);
		speak(populo.currMenu[populo.currMenuItem].name, 'en', true); // TODO change language
	});
};


PopuloNavigationState.prototype.keyUp = function(oculiExtension) {
	this.currMenuItem += this.currMenu.length - 1;
	this.currMenuItem %= this.currMenu.length;
	
	speak(this.currMenu[this.currMenuItem].name, 'en'); // TODO change language
};

PopuloNavigationState.prototype.keyDown = function(oculiExtension) {
	this.currMenuItem += 1;
	this.currMenuItem %= this.currMenu.length;
	
	speak(this.currMenu[this.currMenuItem].name, 'en'); // TODO change language
};


PopuloNavigationState.prototype.keyRight = function(oculiExtension){
	oculiExtension.currMenuItem++; // ovdje uvijek treba dodatni parametar slati, jer se uvijek ide u dublju razinu. obavezno bolje komentirati // TODO COMMENT
	var param = this.currMenu[this.currMenuItem]._id;
	this.currMenuItem = 0;
	var populo = this;

	$.ajax(
		HOSTNAME + this.getMenuItem(oculiExtension).path + '/' + param, 
		{
			method: 'GET',
		}
	).done(function(json){
		populo.currMenu = json;
		speakExtText(populo.getMenuItem(oculiExtension).start);
		speak(populo.currMenu[populo.currMenuItem].name, 'en', true); // TODO change language
	});

};


PopuloNavigationState.prototype.getMenuItem = function(oculiExtension) {
	var currMenuItem = oculiExtension.currMenuItem;
	var currentMenu = POPULO_MENU;
	
	for (var i = 0; i < currMenuItem; i++){
		currentMenu = currentMenu.next;
	}

	return currentMenu;
};