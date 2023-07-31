// background.js (background script)

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Handle the message received from the webpage
    console.log('Message received in extension:', message);

    // You can send a response back to the webpage if needed
    sendResponse({ response: 'Message received successfully!' });
});
