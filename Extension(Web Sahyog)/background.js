// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "requestMicrophonePermission") {
        chrome.permissions.request({
            permissions: ['audioCapture']
        }, (granted) => {
            sendResponse({ granted: granted });
        });
        return true; // Keeps the message channel open until `sendResponse` is called
    }
});
