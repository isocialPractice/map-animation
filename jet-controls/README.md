# Jet Controls

A Three.js 3D demo that maps arrow key presses to simultaneous aircraft physics and engine flame animation. Each arrow key triggers both systems at once: the jet pitches or rolls, and the engines fire. The camera follows the jet in a fixed chase position sourced from `jet-camera-position/playAnimation.json`.

A runtime **config panel** (key `P`) lets you tune pitch/roll sensitivity, inversion, throttle rates, and speed limits live, then export your settings as `jetControls.config.json`. A ★ **Contrail** system (key `C`) traces the jet's world-space flight path as a glowing blue-white vapor trail — the surprise fourth control.

## Mapped Controls

```
keypress ArrowLeft | ArrowUp | ArrowRight | ArrowDown
→ apply animation (engine flames activate)
→ apply control   (aircraft pitch / roll input)
```

## Controls

| Input | Action |
|-------|--------|
| `Arrow Left` | Roll left + activate flames |
| `Arrow Right` | Roll right + activate flames |
| `Arrow Up` | Pitch up + activate flames |
| `Arrow Down` | Pitch down + activate flames |
| `Shift` | Throttle up |
| `Ctrl` | Throttle down |
| `F` | Toggle engine flames manually |
| `C` | Toggle contrail (vapor trail) |
| `P` | Toggle config panel |
| `R` | Reset jet to start position |

## Features

- **Chase camera** — fixed follow-cam offset loaded from `jetControls.animation.json` (sourced from [`jet-camera-position/playAnimation.json`](../jet-camera-position/playAnimation.json)); no orbit controls
- **Arrow-key dual trigger** — a single keypress simultaneously activates engine flames and applies the matching aircraft manoeuvre
- **Aircraft physics** — pitch, roll, coordinated yaw, auto-levelling roll, throttle, gravity, and ground clamp; control logic mimicked from [`.support/aircraft.js`](../.support/aircraft.js)
- **JSON-driven flame placement** — engine positions, rotations, scales, and glow settings loaded from `jet-engine-flame.animation.json`; replace this file with any export from [`jet-engine-flame`](../jet-engine-flame/) to update flame placement instantly
- **Procedural flame animation** — canvas-rendered SVG-style engine flames with layered bezier shapes, radial gradients, and organic flickering; system ported from [`jet-engine-flame`](../jet-engine-flame/)
- **Engine glow** — `THREE.PointLight` color, intensity, and distance loaded from the flame JSON; activates when flames are on
- **Heuristic fallback** — if `jet-engine-flame.animation.json` is absent, flames are auto-placed using STL bounding box detection
- **★ Contrail** — `THREE.Line` vapor trail in world space, marks the full flight path; toggleable, with adjustable length and opacity
- **Config panel** — live-adjustable pitch/roll sensitivity, inversion, throttle rates, speed limits, and contrail settings; exportable to `jetControls.config.json`

## Quick Start

A local HTTP server is required so the browser can load `jet.stl` and the JSON files via `fetch`.

```bash
# Node.js (npx — no install needed)
npx serve .

# Python 3
python -m http.server 8080

# PHP
php -S localhost:8080
```

Then open: **http://localhost:8080/jet-controls/**

## File Structure

```
map-animation/
├── assets/
│   └── jet.stl                             # 3D jet model (shared)
├── jet-controls/
│   ├── index.html                          # Self-contained Three.js demo
│   ├── jet-engine-flame.animation.json     # Drop-in: flame positions/rotations/scales/glow
│   ├── jetControls.animation.json          # Camera chase offset + base physics (stable)
│   ├── jetControls.config.json             # Runtime config: exported from panel, loaded at startup
│   └── README.md                           # This file
├── jet-engine-flame/
│   └── index.html                          # Source of the animation JSON export
├── jet-camera-position/
│   └── playAnimation.json                  # Source of the chase-camera offset
└── .support/
    └── aircraft.js                         # Source of the aircraft control logic
```

## Three-JSON Architecture

`jet-controls` uses three JSON files with distinct responsibilities:

| File | Purpose | Who changes it |
|------|---------|---------------|
| `jet-engine-flame.animation.json` | Flame placement — exact drop-in from `jet-engine-flame` export | Drop-replace from `jet-engine-flame` editor |
| `jetControls.animation.json` | Camera chase offset + base physics constants | Developer (rarely) |
| `jetControls.config.json` | Runtime control config — sensitivity, rates, contrail | User via panel export |

---

### `jet-engine-flame.animation.json` — Flame placement (drop-in)

This is a **direct copy** of the JSON exported by the `jet-engine-flame` tool. It tells `jet-controls` exactly where to place each engine flame, at what rotation and scale, and what glow settings to use.

To update flame positions from `jet-engine-flame`:
1. Open `jet-engine-flame` and position the flames with the gizmo editor
2. Click **EXPORT JSON** — a `jet-engine-flame.animation.json` file downloads
3. Drop that file into the `jet-controls/` folder, replacing the existing one
4. Reload `jet-controls` — flames appear at the new positions

```json
{
  "version": "1.0",
  "model": "../assets/jet.stl",
  "animations": [
    {
      "id": "engine_0",
      "label": "Engine 1",
      "type": "flame",
      "active": true,
      "transform": {
        "position": { "x": -0.217, "y": 0, "z": -0.934 },
        "rotation": { "x": 87.815, "y": 0, "z": 0 },
        "scale":    { "x": 1, "y": 1, "z": 1 }
      },
      "appearance": { "flameScale": 0.687, "spriteCount": 4, "blending": "additive" }
    }
  ],
  "scene": {
    "engineGlow": { "color": "#ff5500", "intensity": 3, "distance": 4 }
  }
}
```

---

### `jetControls.animation.json` — Camera + base physics

Holds the chase-camera offset (sourced from `jet-camera-position/playAnimation.json`) and the base aircraft physics constants. **No `animations` block** — flame placement lives in the drop-in file.

```json
{
  "version": "1.0",
  "camera": {
    "position": { "x": -0.024, "y": 0.681, "z": -3.368 },
    "target":   { "x": 0, "y": 0, "z": 0 },
    "fov": 45
  },
  "controls": {
    "pitchRate": 1.2,
    "rollRate":  2.0,
    "minSpeed":  0.5,
    "maxSpeed":  5.0,
    "gravity":   0.05,
    "animationTrigger": "arrowKeys",
    "keymap": { ... }
  }
}
```

---

### `jetControls.config.json` — Runtime config (exportable)

The user-facing config file. Loaded at startup to override built-in defaults. Written by the **Export Config** panel button with the current panel state.

```json
{
  "version": "1.0",
  "pitchSensitivity": 1.0,
  "rollSensitivity":  1.0,
  "invertPitch":      false,
  "invertRoll":       false,
  "throttleAccel":    3.0,
  "throttleDecel":    3.0,
  "maxSpeed":         5.0,
  "minSpeed":         0.5,
  "contrail": {
    "enabled": true,
    "length":  200,
    "opacity": 0.6
  },
  "exportedAt": null
}
```

**Export workflow:**
1. Open the config panel (`P`)
2. Adjust sliders/toggles until the feel is right
3. Click **↧ Export Config** at the bottom of the panel
4. Drop the downloaded `jetControls.config.json` into `jet-controls/`
5. Reload — the saved config is applied automatically

---

## ★ Contrail System

The contrail is the fourth control — a **vapor trail** that marks the jet's world-space flight path as a glowing blue-white line.

- **Toggle:** `C` key, or the **Enabled** toggle in the Contrail panel section
- **Trail Length (20–300):** how many world-position samples are kept; longer = more history visible
- **Opacity (0.05–1.0):** how bright the trail is

The trail is rendered as a `THREE.Line` with vertex colors and additive blending. The oldest sample is near-black (invisible against the dark background) and fades to bright blue-white at the newest point. Clearing the trail (by toggling off) resets all samples.

The contrail is great for revealing loops, spirals, and banking manoeuvres over time.

---

## Config Panel

Open with `P` or click the **⚙ CONFIG** button (top-right). The panel slides in from the right. Three collapsible sections:

| Section | Controls |
|---------|---------|
| **Pitch & Roll** | Pitch Sens (0.3–3×), Roll Sens (0.3–3×), Invert Pitch toggle, Invert Roll toggle |
| **Throttle** | Accel Rate (0.5–10), Decel Rate (0.5–10), Max Speed (1–10), Min Speed (0–2) |
| **★ Contrail [C]** | Enabled toggle, Trail Length (20–300), Opacity (0.05–1.0) |

All settings are applied immediately (no save needed to see changes). Use **↧ Export Config** at the bottom to write `jetControls.config.json`.

---

## How It Works

### Config Loading

On startup, `init()` fetches all three JSON files in parallel before loading the STL:

```js
const [flameConfig, ctrlConfig, savedConfig] = await Promise.all([
  load('jet-engine-flame.animation.json', null),
  load('jetControls.animation.json',      null),
  load('jetControls.config.json',         null),
]);
```

If any fetch fails, that config falls back to `null` and built-in defaults are used. The flame config falling back triggers the heuristic STL-based placement.

### Flame Placement (JSON path)

Each entry in `flameConfig.animations` becomes an engine flame group with the exact geometry from the export. `transform.rotation` is stored in degrees (matching the `jet-engine-flame` UI) and converted to radians at load time:

```js
group.rotation.set(
  THREE.MathUtils.degToRad(tf.rotation.x),
  THREE.MathUtils.degToRad(tf.rotation.y),
  THREE.MathUtils.degToRad(tf.rotation.z)
);
```

### Chase Camera

The camera is positioned each frame using the offset from `jetControls.animation.json` rotated by the jet's current yaw:

```js
_camOffset.copy(CAM_OFFSET).applyEuler(new THREE.Euler(0, acRot.y, 0, 'YXZ'));
camera.position.copy(acPos).add(_camOffset);
camera.lookAt(acPos);
```

### Arrow-Key Shorthand

The `onArrowDown()` handler fires for every arrow keydown event and activates the flames if they are not already on. The same event also sets the matching aircraft input flag. Both systems respond in the same frame.

### Aircraft Physics

Control logic mimics `.support/aircraft.js`. The `cfg` object multiplies base rates:

| Constant | Default | Adjustable via |
|----------|---------|----------------|
| `AC_PITCH` × `cfg.pitchSens` | `1.2 rad/s` × `1.0` | Pitch Sens slider |
| `AC_ROLL` × `cfg.rollSens` | `2.0 rad/s` × `1.0` | Roll Sens slider |
| `cfg.accelRate` | `3.0 /s` | Accel Rate slider |
| `cfg.decelRate` | `3.0 /s` | Decel Rate slider |
| `cfg.maxSpeed` | `5.0` | Max Speed slider |
| `cfg.minSpeed` | `0.5` | Min Speed slider |
| `AC_GRAVITY` | `0.05 /s` | (not adjustable) |

Roll auto-levels at `1.5×` the dt rate when no roll input is held. Banking causes coordinated yaw via `Math.sin(roll) * 1.2 * dt`.

---

## Dependencies

All loaded from CDN — no install required.

| Package | Version | Purpose |
|---------|---------|---------|
| `three` | 0.169.0 | 3D renderer, scene graph |
| `three/addons/loaders/STLLoader` | 0.169.0 | STL model loading |

## Extending

- **Re-export anytime** — change flame positions in `jet-engine-flame`, export, drop in the new JSON; no code changes needed
- **Persist config** — adjust panel sliders, click Export Config, drop the JSON in the folder; settings survive reload
- **Full aircraft module** — replace the inlined physics with the `Aircraft` class from `.support/aircraft.js` once imported via an ES module bundler
- **Camera animation** — wire the `jet-camera-position` animation system to play a cinematic intro before handing off to the chase cam
- **Throttle flames** — scale `flameScale` with `acSpeed / cfg.maxSpeed` for flame size feedback
