chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ youtubeData: {} });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "saveVideoData") {
    chrome.storage.local.set({ youtubeData: request.data });
  }
});
