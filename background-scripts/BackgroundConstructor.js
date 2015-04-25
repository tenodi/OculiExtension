/**
 *  This script runs only once - first time Oculi Ekstension's background scripts are loaded.
 */

console.log('BackgroundConstructor loaded');



chrome.storage.local.get('rate', function(items){
	// set only once!
	if (!items.rate){
		chrome.storage.local.set({'rate': 1.0}, function(){
			console.log('Rate set!');
		});
	}
});