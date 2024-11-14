chrome.commands.onCommand.addListener(function (command) {
    if (command === "open_popup") {
        chrome.system.display.getInfo(function (displays) {
            let primaryDisplay = displays.find(display => display.isPrimary);

            // to get the popup in the center
            var w = Math.round(primaryDisplay.bounds.width * 0.7);
            var h = Math.round(primaryDisplay.bounds.height * 0.5);
            var left = Math.round((primaryDisplay.bounds.width / 2) - (w / 2));
            var top = Math.round((primaryDisplay.bounds.height / 2) - (h / 2));

            chrome.windows.create({
                'url': 'popup.html', // Replace with the correct path to your popup file
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
    }
});

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

/* tab usage/analysis */

let usageData = [];
function saveDataLocally() {
    chrome.storage.local.set({ unsentUsageData: usageData });
}

// when a tab is opened
chrome.tabs.onActivated.addListener((activeInfo) => {
    const now = new Date().toISOString();

    // mark the last opened tab 'inactive' and record its close time
    if (usageData.length > 0) {
        const lastTab = usageData[usageData.length - 1];
        if (!lastTab.closedAt) {
            lastTab.closedAt = now;
            saveDataLocally();
        }
    }

    // Add new entry for the newly activated tab
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        const newTabData = {
            tabId: tab.id,
            url: tab.url,
            title: tab.title,
            favIconUrl: tab.favIconUrl,
            openedAt: now,
            closedAt: null, 
        };
        usageData.push(newTabData);
        saveDataLocally();
    });
});

// when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    const now = new Date().toISOString();

    const tabIndex = usageData.findIndex(tab => tab.tabId === tabId);
    if (tabIndex !== -1) {
        usageData[tabIndex].closedAt = now;
        saveDataLocally();
    }
});


/* tab usage/analysis */

// console.log("tesr",localStorage.getItem('authToken'));

chrome.action.onClicked.addListener(() => {
    chrome.storage.local.get(['unsentUsageData'], (result) => {
        if (result.unsentUsageData) {
            const data = {
                usageData: result.unsentUsageData
            };
         let authToken;
            chrome.storage.local.get(["authToken"], function (result) {
                if (result.authToken) {
                    fetch('https://deplo2.onrender.com/api/tab/usage/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${result.authToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then(response => {

                    }).catch(error => {
                        console.error("Error sending data:", error);
                    });

                } else {
                    console.log("authToken not found.");
                }
            });
            chrome.storage.local.remove('unsentUsageData');
        }
    });
});


chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        const { action } = msg;

        if (action === 0) {
            // fetch all opened tabs
            sendAllTabs(action);
        }
        else if (action == 1) {
            // close tab with the given id
            closeTab(action, msg.id);
        }
        else if (action == 2) {
            pinTab(action, msg.id);
        }
        else if (action == 3) {
            unPinTab(action, msg.id);
        }
        else if (action == 4) {
            duplicateTab(action, msg.id);
        }
        else if (action == 5) {
            createNewTab(action);
        }
        else if (action == 6) {
            setActiveTab(action, msg.id);
        }
        else if (action == 7) {
            createIncognitoTab(action);
        }
        else if (action == 8) {
            createBookmark(action, msg.tab);
        }
        else if (action == 9) {
            openInIncognito(action, msg.url);
        }
        else if (action == 10) {
            // to open/switch a tab inside a group
            openGroupTab(action, msg.tab);
        }
        else if (action == 11) {
            // get closed tabs
            getClosedTabs(action);
        }
        else if (action == 12) {
            restoreTab(action, msg.tab);
        }
        else if(action == 13){
            unbookmark(action, msg.tab);
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
            getClosedTabs(11);
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

    const openGroupTab = (action, tab) => {
        chrome.tabs.query({}, (tabs) => {
            const targetTab = tabs.find(elm => elm.id === tab.id);
            const existingTabWithSameUrl = tabs.find(elm => elm.url === tab.url && elm.id !== tab.id);

            if (targetTab) {
                // If the tab with the specified ID exists, activate it
                chrome.tabs.update(tab.id, { active: true });
            }
            else if (existingTabWithSameUrl) {
                chrome.tabs.update(existingTabWithSameUrl.id, { active: true });
                fetch('https://deplo2.onrender.com/api/tab', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tabId: tab.id,
                        newTabId: existingTabWithSameUrl.id
                    })
                })
                    .then(response => response.json())
                    .catch(error => {
                        console.error('Error with API request:', error);
                    });
            }
            else {
                // If the tab does not exist, open a new one with the specified URL
                chrome.tabs.create({ url: tab.url }, (newTab) => {
                    fetch('https://deplo2.onrender.com/api/tab', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tabId: tab.id,
                            newTabId: newTab.id
                        })
                    })
                        .then(response => response.json())
                        .catch(error => {
                            console.error('Error with API request:', error);
                        });

                });
            }
        });

    }

    const getClosedTabs = (action) => {
        const tabs = [];
        chrome.sessions.getRecentlyClosed({ maxResults: 10 }, (sessions) => {
            sessions.forEach((session) => {
                // if a tab
                if (session.tab) {
                    tabs.push(session.tab);
                }
            });
            const res = {
                action: action,
                tabs: tabs
            }
            port.postMessage(res);
        });
    }

    const restoreTab = (action, tab) => {
        chrome.windows.getAll({ populate: true }, (windows) => {
            // Find a window that is not the popup and is a normal browser window
            const mainWindow = windows.find(win => win.type === 'normal');

            if (mainWindow) {
                chrome.sessions.restore(tab.sessionId, (restoredTab) => {
                    if (restoredTab && restoredTab.id) {
                        chrome.tabs.move(restoredTab.id, { windowId: mainWindow.id, index: -1 }, () => {
                            console.log('Tab restored to the main window');
                        });
                    }
                });
            } else {
                console.error('No suitable main window found');
            }
        });
    };

    const createBookmark = (action, tab) => {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            const bookmarkBar = bookmarkTreeNodes[0].children.find(node => node.title === 'Bookmarks bar');

            if (bookmarkBar) {
                const tabsterFolder = bookmarkBar.children.find(folder => folder.title === 'Tabster Bookmarks');

                if (tabsterFolder) {
                    addBookmark(tabsterFolder.id);
                } else {
                    chrome.bookmarks.create({
                        parentId: bookmarkBar.id,
                        title: 'Tabster Bookmarks'
                    }, (newFolder) => {
                        addBookmark(newFolder.id);
                    });
                }
            } else {
                console.error('Bookmarks Bar not found');
            }
        });

        const addBookmark = (parentId) => {
            chrome.bookmarks.create({
                parentId: parentId,
                title: tab.title,
                url: tab.url
            }, () => {
                sendAllTabs(0);
            });
        };
    }

    const unbookmark = (action, tab) => {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            const bookmarkBar = bookmarkTreeNodes[0].children.find(node => node.title === 'Bookmarks bar');
    
            if (bookmarkBar) {
                const tabsterFolder = bookmarkBar.children.find(folder => folder.title === 'Tabster Bookmarks');
    
                if (tabsterFolder) {
                    const existingBookmark = tabsterFolder.children.find(bookmark => bookmark.url === tab.url);
    
                    if (existingBookmark) {
                        // Unbookmark the tab
                        chrome.bookmarks.remove(existingBookmark.id, () => {
                            sendAllTabs(0);
                        });
                    } else {
                        console.log('Tab is not bookmarked in Tabster Bookmarks');
                    }
                } else {
                    console.log('Tabster Bookmarks folder not found');
                }
            } else {
                console.error('Bookmarks Bar not found');
            }
        });
    };



});

chrome.windows.onRemoved.addListener((windowId) => {
    chrome.windows.getAll({ populate: true }, (windows) => {
        const remainingNormalWindows = windows.filter(win => win.type === 'normal');

        if (remainingNormalWindows.length === 0) {
            if (usageData.length > 0) {
                const now = new Date().toISOString();

                usageData = usageData.map(tab => {
                    if (tab.windowId === windowId && !tab.closedAt) {
                        tab.closedAt = now;
                    }
                    return tab;
                });

                saveDataLocally();
            }
        }
    });
});




