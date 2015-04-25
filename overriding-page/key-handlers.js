$( document ).ready(function() {

    function sendMsgToExt(key){
        // debug
        $('#container').append('<p>' + key + '</p>');
        chrome.runtime.sendMessage({key: key}, function(response) {
          // debug
          // console.log(response.farewell);
        });
    }

    $(document).keydown(function(e) {
        switch(e.which) {
            case 8:
            sendMsgToExt('key-backspace');
            break;

            case 13: // enter
            sendMsgToExt('key-enter');
            break;

            case 37: // left
            sendMsgToExt('key-left');
            break;

            case 38: // up
            sendMsgToExt('key-up');
            break;

            case 39: // right
            sendMsgToExt('key-right');
            break;

            case 40: // down
            sendMsgToExt('key-down');
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });


    // odmah kada se učita dokument, šaljemo ekstenziji event!
    sendMsgToExt('app-start');
});