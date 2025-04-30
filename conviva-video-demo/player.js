
const CUSTOMER_KEY = 'af65934b0b34dd0b9a740f85f79b4b9d9f013a65';
const TEST_GATEWAY_URL = 'https://af65934b0b34dd0b9a740f85f79b4b9d9f013a65.ts-testonly.conviva.com';

// Step 1: Init with test gateway
const settings = {};
settings[Conviva.Constants.GATEWAY_URL] = TEST_GATEWAY_URL;
settings[Conviva.Constants.LOG_LEVEL] = Conviva.Constants.LogLevel.DEBUG;

Conviva.Analytics.init(CUSTOMER_KEY, null, settings);

// Step 2: Set device metadata
const deviceMetadata = {};
deviceMetadata[Conviva.Constants.DeviceMetadata.TYPE] = Conviva.Constants.DeviceType.DESKTOP;
deviceMetadata[Conviva.Constants.DeviceMetadata.CATEGORY] = Conviva.Constants.DeviceCategory.WEB;
Conviva.Analytics.setDeviceMetadata(deviceMetadata);

// Step 3: Setup Player
const videoPlayer = document.getElementById('videoPlayer');
const ConvivaHtml5Module = window.ConvivaHtml5Module;

const options = {};
options[Conviva.Constants.CONVIVA_MODULE] = ConvivaHtml5Module;

const videoAnalytics = Conviva.Analytics.buildVideoAnalytics();
videoAnalytics.setPlayer(videoPlayer, options);

// Step 4: Send asset metadata
const contentInfo = {};
contentInfo[Conviva.Constants.ASSET_NAME] = "Kiran Test Video";
contentInfo["c3.cm.contentType"] = "Training";
contentInfo["c3.cm.categoryType"] = "DemoSeries";

// Report session start
videoAnalytics.reportPlaybackRequested(contentInfo);
// Reinforce metadata immediately
videoAnalytics.setContentInfo(contentInfo);

// Step 5: Cleanup on video end
videoPlayer.addEventListener("ended", () => {
  videoAnalytics.reportPlaybackEnded();
  videoAnalytics.release();
  Conviva.Analytics.release();
});
