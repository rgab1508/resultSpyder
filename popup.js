document.addEventListener('DOMContentLoaded', () => {
	let startButton = document.querySelector('#start');
	let saveButton = document.querySelector('#save');
	startButton.onclick = e => {
		//e.preventDefault();
		// console.log('clicked');
		chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
			let activeTab = tabs[0];

			chrome.tabs.sendMessage(activeTab.id, { message: 'start' });
		});
	};
	saveButton.onclick = e => {
		chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
			let activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, { message: 'save' });
		});
	};
});
