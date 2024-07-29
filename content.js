function saveVideoData() {
  const video = document.querySelector("video");
  if (video) {
    const videoData = {
      url: window.location.href,
      currentTime: video.currentTime,
    };
    chrome.runtime.sendMessage({ type: "saveVideoData", data: videoData });
  }
}

setInterval(saveVideoData, 10000); // Save every 10 seconds
