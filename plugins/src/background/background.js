// TODO: background script
// chrome.runtime.onInstalled.addListener(() => {
// }
chrome.action.onClicked.addListener(function() {
    chrome.system.display.getInfo(function(displays) {
        let primaryDisplay = displays.find(display => display.isPrimary);

        var w = Math.round(primaryDisplay.bounds.width * 0.7);
        var h = Math.round(primaryDisplay.bounds.height * 0.5);
        var left = Math.round((primaryDisplay.bounds.width / 2) - (w / 2));
        var top = Math.round((primaryDisplay.bounds.height / 2) - (h / 2))

        chrome.windows.create({
            'url': 'popup.html',
            'type': 'popup',  
            'width': w,
            'height': h,
            'left': left,
            'top': top
        }, function(popupWindow) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            // event listener to close the window when clicking outside
            chrome.windows.onFocusChanged.addListener(function(windowId) {
                if (windowId !== popupWindow.id && windowId !== chrome.windows.WINDOW_ID_NONE) {
                    chrome.windows.getAll({}, function(windows) {
                        if (windows.some(win => win.id === popupWindow.id)) {
                            chrome.windows.remove(popupWindow.id);
                        }
                    });
                }
            });
        });
    });
});


