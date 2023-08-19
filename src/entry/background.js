chrome.runtime.onMessage.addListener((message) => {
    if (message.key == 'highlighted') {
        chrome.runtime.sendMessage({
            key: 'tracked'
        });
    }
});


chrome.runtime.onMessage.addListener((message) => {
    if (message.key == 'unTracked') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { key: "removeHighlight" });
        });
    }
});

