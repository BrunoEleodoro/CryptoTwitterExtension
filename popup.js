// // Initialize button with users' preferred color
// const changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener('click', async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: setPageBackgroundColor
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get('color', ({ color }) => {
//     document.body.style.background = "linear-gradient(0deg, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url('https://media.tenor.com/IvyuPtEfzhoAAAAM/matrix.gif')";
//   });
// }
