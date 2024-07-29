document.getElementById("resumeBtn").addEventListener("click", () => {
  chrome.storage.local.get("youtubeData", (result) => {
    const videoData = result.youtubeData;
    if (videoData && videoData.url) {
      const newUrl = `${videoData.url}&t=${Math.floor(videoData.currentTime)}s`;

      // Check if the YouTube video is already open in a tab
      chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
        let tabFound = false;

        tabs.forEach((tab) => {
          if (tab.url.includes(videoData.url)) {
            tabFound = true;
            chrome.tabs.update(tab.id, { active: true }, (updatedTab) => {
              chrome.scripting.executeScript({
                target: { tabId: updatedTab.id },
                function: checkAndUpdateVideoTime,
                args: [videoData.currentTime],
              });
            });
          }
        });

        if (!tabFound) {
          chrome.tabs.create({ url: newUrl });
        }
      });
    } else {
      alert("No video data found.");
    }
  });
});

// Function to check and update the video time
function checkAndUpdateVideoTime(savedTime) {
  const video = document.querySelector("video");
  if (video) {
    if (Math.abs(video.currentTime - savedTime) > 1) {
      video.currentTime = savedTime;
    }
  }
}
