chrome.browserAction.onClicked.addListener(tab => {
	console.log('button clicked!');

	// Send a message to the tab that is open when button was clicked
	chrome.tabs.sendMessage(tab.id, { message: 'browser action' });
});

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
	if (request.message === 'thank you') {
		// Not doing anything for messages received but I could!
	}
}
