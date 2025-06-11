
const CUSTOMER_KEY = 'af65934b0b34dd0b9a740f85f79b4b9d9f013a65';
const TEST_GATEWAY_URL = 'https://af65934b0b34dd0b9a740f85f79b4b9d9f013a65.ts-testonly.conviva.com';

// 1. Initialize AppTracker
console.log("[ECO] Initializing AppTracker...");
window.apptracker('convivaAppTracker', {
  appId: 'KiranWebPlayer',
  convivaCustomerKey: CUSTOMER_KEY,
  appVersion: "1.0.0"
});

const viewerId = 'kiran-' + Math.floor(Math.random() * 100000);
window.apptracker('setUserId', viewerId);
window.apptracker('trackPageView', { title: "Conviva Web Player Page" });
window.apptracker('setCustomTags', {
  environment: 'test',
  vstGroup: 'TestGroupA',
  userType: 'internal',
  playerVersion: 'v1.0.0'
});
console.log("[ECO] AppTracker Initialized");

// 2. Initialize Video Sensor
const settings = {};
settings[Conviva.Constants.GATEWAY_URL] = TEST_GATEWAY_URL;
settings[Conviva.Constants.LOG_LEVEL] = Conviva.Constants.LogLevel.DEBUG;

Conviva.Analytics.init(CUSTOMER_KEY, null, settings);
console.log("[VIDEO] Video Sensor Initialized");

// 3. Set Metadata
const deviceMetadata = {};
deviceMetadata[Conviva.Constants.DeviceMetadata.TYPE] = Conviva.Constants.DeviceType.DESKTOP;
deviceMetadata[Conviva.Constants.DeviceMetadata.CATEGORY] = Conviva.Constants.DeviceCategory.WEB;
Conviva.Analytics.setDeviceMetadata(deviceMetadata);

// 4. Setup Player
const videoPlayer = document.getElementById("videoPlayer");
const ConvivaHtml5Module = window.ConvivaHtml5Module;
const options = {};
options[Conviva.Constants.CONVIVA_MODULE] = ConvivaHtml5Module;

const videoAnalytics = Conviva.Analytics.buildVideoAnalytics();
videoAnalytics.setPlayer(videoPlayer, options);

// 5. Track user attempt
const startTime = performance.now();
window.apptracker('trackEvent', 'VideoAttempt', {
  videoAsset: 'Kiran Test Video',
  timestamp: Date.now()
});

// 6. Report playback requested
const contentInfo = {};
contentInfo[Conviva.Constants.ASSET_NAME] = "Kiran Test Video";
contentInfo[Conviva.Constants.VIEWER_ID] = viewerId;
contentInfo["c3.cm.contentType"] = "Training";
contentInfo["c3.cm.categoryType"] = "DemoSeries";
contentInfo["c3.cm.playerVersion"] = "v1.0.0";
contentInfo["c3.cm.vstGroup"] = "TestGroupA";
contentInfo["c3.cm.userType"] = "internal";

videoAnalytics.reportPlaybackRequested(contentInfo);
videoAnalytics.setContentInfo(contentInfo);

window.apptracker('trackEvent', 'PlaybackRequestedSent', {
  viewerId: viewerId,
  networkState: videoPlayer.networkState
});

// 7. Intermediate Player Events
videoPlayer.addEventListener('waiting', () => {
  window.apptracker('trackEvent', 'VideoBuffering', {
    timestamp: Date.now(),
    networkState: videoPlayer.networkState
  });
});

videoPlayer.addEventListener('seeking', () => {
  window.apptracker('trackEvent', 'VideoSeeking');
});

videoPlayer.addEventListener('stalled', () => {
  window.apptracker('trackEvent', 'VideoStalled');
});

videoPlayer.addEventListener('error', () => {
  window.apptracker('trackEvent', 'PlaybackError', {
    code: videoPlayer.error?.code || 'N/A',
    message: videoPlayer.error?.message || 'Unknown error'
  });
});

// 8. Playback Start
videoPlayer.addEventListener('playing', () => {
  const timeToStart = Math.round(performance.now() - startTime);
  window.apptracker('trackEvent', 'VideoPlaying', {
    videoAsset: 'Kiran Test Video',
    timeToStart: timeToStart
  });
});

// 9. Cleanup on End
videoPlayer.addEventListener("ended", () => {
  videoAnalytics.reportPlaybackEnded();
  videoAnalytics.release();
  Conviva.Analytics.release();
});
