
# Conviva Video Demo

This project demonstrates how to integrate the Conviva Video Sensor with a simple HTML5 video player.

## 📺 What This Is

A basic HTML5 page that plays a video and sends playback telemetry (play, pause, end, buffering, etc.) to Conviva Pulse for analysis and monitoring.

## 📁 Project Structure

```
conviva-video-demo/
├── index.html                   # Video player UI
├── player.js                   # Conviva integration logic
├── conviva-core-sdk.js         # Conviva core SDK (from GitHub or internal access)
├── conviva-html5native-impl.js # Conviva HTML5 integration module
├── Conviva_PlayerJS_Explanation.pdf  # Line-by-line explanation of the integration
```

## 🚀 How to Run Locally

1. Clone or download this repo.
2. Navigate to the folder.
3. Run a local server (required due to browser security rules):

**Using Python:**
```bash
python3 -m http.server 8000
```

4. Open your browser and go to:
```
http://localhost:8000/index.html
```

5. Play the video.

## 📊 How It Works

- On video start, Conviva SDK calls `reportPlaybackRequested()` with metadata.
- On end, it calls `reportPlaybackEnded()` and releases the session.
- The video session appears in [Conviva Pulse](https://pulse.conviva.com) (Touchstone & Historical dashboards).

## 📄 PDF Guide

See `Conviva_PlayerJS_Explanation.pdf` for a full breakdown of how the integration works.

## 🧠 Useful Tags

- Asset Name: `Kiran Test Video`
- Content Type: `Training`
- Category Type: `DemoSeries`

## 👨‍💻 Author

This project was created as part of a hands-on exercise to learn and demonstrate how Conviva Video Sensor works with web video players.

---
