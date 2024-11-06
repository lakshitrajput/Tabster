// to get the popup in the center
chrome.action.onClicked.addListener(function () {
    chrome.system.display.getInfo(function (displays) {
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
        }, function (popupWindow) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            // event listener to close the window when clicking outside
            chrome.windows.onFocusChanged.addListener(function (windowId) {
                if (windowId !== popupWindow.id && windowId !== chrome.windows.WINDOW_ID_NONE) {
                    chrome.windows.getAll({}, function (windows) {
                        if (windows.some(win => win.id === popupWindow.id)) {
                            chrome.windows.remove(popupWindow.id);
                        }
                    });
                }
            });
        });
    });
});


chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        const { action } = msg;

        if (action === 0) {
            // fetch all opened tabs
            sendAllTabs(action);
        }
        else if(action == 1){
            // close tab with the given id
            closeTab(action, msg.id);
        }
        else if(action == 2){
            pinTab(action, msg.id);
        }
        else if(action == 3){
            unPinTab(action, msg.id);
        }
        else if(action == 4){
            duplicateTab(action, msg.id);
        }
        else if(action == 5){
            createNewTab(action);
        }
        else if(action == 6){
            setActiveTab(action, msg.id);
        }
        else if(action == 7){
            createIncognitoTab(action);
        }
        else if(action == 9){
            openInIncognito(action, msg.url);
        }
    });


    // all tabs -> popup
    const sendAllTabs = (action) => {
        chrome.tabs.query({}, (tabs) => {
            const tabsArr = tabs;
            const res = {
                action: action,
                data: tabsArr
            }
            port.postMessage(res);
        });
    }

    
    const closeTab = (action, tabId) => {
        chrome.tabs.remove(tabId, () => {
            sendAllTabs(0);
        });
    }

    const pinTab = (action, tabId) => {
        chrome.tabs.update(tabId, { pinned: true }, () => {
            sendAllTabs(0);
        });
    }

    const unPinTab = (action, tabId) => {
        chrome.tabs.update(tabId, { pinned: false }, () => {
            sendAllTabs(0);
        });
    }

    const duplicateTab = (action, tabId) => {
        chrome.tabs.duplicate(tabId, () => {
            sendAllTabs(0);
        })
    }

    const createNewTab = (action) => {
        chrome.tabs.create({}, () => {
            sendAllTabs(0);
        })
    }

    const setActiveTab = (action, tabId) => {
        chrome.tabs.update(tabId, { active: true }, () => {
            sendAllTabs(0);
        })
    }

    const createIncognitoTab = (action) => {
        chrome.windows.create({ incognito: true, url: 'about:blank' }, (window) => {
            sendAllTabs(0);
        });
    }

    const openInIncognito = (action, taburl) => {
        chrome.windows.create({  
            url: taburl,
            incognito: true
        })    
    }

});



