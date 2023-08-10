
chrome.runtime.onMessage.addListener((message) => {
    if (message.key == 'highlighted') {
        chrome.runtime.sendMessage({
            key: 'tracked'
        });
    }
});



