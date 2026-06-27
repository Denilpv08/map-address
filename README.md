# 🗺️ Maplewood Neighborhood — Interactive Map

**English Assignment · UNIMINUTO**
**Author:** Denilson Yusep Prescott Viloria
**Tool used:** HTML (no external platform required)

---

## 📌 What is this?

This is an interactive neighborhood map built in a single HTML file. It covers all required elements of the English assignment: a designed map with labeled places and streets, written directions for 5 destinations, a neighborhood description, key vocabulary, and audio recording support for oral delivery.

---

## 📁 Files

| File                    | Description                                 |
| ----------------------- | ------------------------------------------- |
| `neighborhood_map.html` | Main application — open this in any browser |
| `README.md`             | This file                                   |

> No installation required. No internet required after the page loads (fonts load from Google Fonts on first open).

---

## 🚀 How to open it

1. Download `neighborhood_map.html`
2. Double-click the file
3. It opens in your default browser (Chrome, Firefox, Edge — all work)

---

## 🗂️ Application Structure

The app has **3 tabs**:

### 📍 Tab 1 — Map & Places

- Interactive SVG map of Maplewood neighborhood
- Click any building on the map **or** any place in the left panel to open a popup
- The popup shows the place name, address, description, and an **audio player** to upload your recording for that place
- Includes compass rose (N / S / E / W), traffic lights, streets, and a park with fountain

**10 places included:**
Supermarket, School, Central Park, City Hospital, Subway Station, Corner Café, Public Library, Pharmacy, National Bank, Fashion Store — plus Home as the starting point.

**5 streets included:**
Maple Avenue, Oak Street, Pine Boulevard, Elm Lane, River Road.

### 🧭 Tab 2 — Directions

- 5 written routes from Home to different destinations
- Each route uses required vocabulary: _go straight, turn left/right, cross the street, next to, in front of, minutes by foot_
- Each route card has its own **audio player** to upload your voice recording for that route

### 📝 Tab 3 — Description & Audio

- Written neighborhood description (5–6 lines as required)
- Key vocabulary section: corner, crossing, roundabout, traffic light, bridge, block
- **Main audio player** for the required oral recording (route to the park, max 2 minutes)

---

## 🎙️ How to add your audio recordings

1. Record your audio on your phone or computer (`.mp3`, `.m4a`, `.wav` formats work)
2. Open the app in the browser
3. Go to the tab where you want to add the audio
4. Click **"📁 Upload audio"** on the player of that place or route
5. Select your recorded file — it loads instantly and plays automatically
6. Use the progress bar to navigate the audio

> ⚠️ Audio files load locally. They are not uploaded to any server. If you close and reopen the browser, you will need to upload the files again.

---

## 📋 Assignment Checklist

| Requirement                                  | Status                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| Map with at least 10 places                  | ✅ 11 places                                                                     |
| Streets with names                           | ✅ 5 streets                                                                     |
| Compass (N / S / E / W)                      | ✅ Included                                                                      |
| Landmarks (traffic lights, fountain, square) | ✅ Included                                                                      |
| Written directions for 5 destinations        | ✅ Tab 2                                                                         |
| Direction vocabulary used                    | ✅ go straight, turn right/left, cross the street, next to, in front of, by foot |
| Oral recording (max 2 min)                   | ✅ Player in Tab 3                                                               |
| Written neighborhood description (5–6 lines) | ✅ Tab 3                                                                         |
| Interactive elements with clickable places   | ✅ Popups + audio players                                                        |
| Audio per place and per route                | ✅ 17 upload zones total                                                         |

---

## 🎙️ Audio scripts summary

### Main recording (Tab 3 — required)

> "Hello! I am going to explain how to get to the park. Start at my home on Maple Avenue. Go straight north for one block. Turn right at the traffic light. Walk two blocks on Oak Street. Cross the street at the crossing. The park is in front of you. It takes five minutes by foot. Thank you!"

### Route recordings (Tab 2 — 5 total)

| Route                 | Key directions                                          |
| --------------------- | ------------------------------------------------------- |
| Home → Supermarket    | Go straight north · left side · five minutes            |
| Home → Corner Café    | Turn right at traffic light · cross the street · corner |
| Home → Central Park   | Turn right · two blocks · in front of you               |
| Home → City Hospital  | Go south · turn left · cross at the bridge              |
| Home → Subway Station | Walk east · roundabout · turn right                     |

### Place recordings (Tab 1 — 11 total, optional)

Short 1–2 sentence descriptions for each clickable place on the map.

---

## 🛠️ Technical details

- Built with: HTML5, CSS3, JavaScript (vanilla)
- No frameworks, no libraries, no dependencies
- Single self-contained file
- Works offline (except Google Fonts on first load)
- Compatible with: Chrome, Firefox, Edge, Safari
