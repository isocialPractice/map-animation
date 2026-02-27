# Firework Burst Launch

A pure SVG firework launcher controlled entirely by keyboard. Aim a launcher turret, adjust power, and fire fireworks into a starlit sky above a city skyline silhouette. Each firework detonates into one of four procedural burst patterns rendered as SVG particles with gravity, trails, and fade effects. Each burst type has a JSON configuration file that can be adjusted live via the config panel and exported for use as a game element.

## Features

- Pure SVG rendering with vanilla JavaScript
- Four configurable burst types: Classic Boom, Ring Halo, Star Scatter, Willow Cascade
- JSON-driven configuration per burst type (loaded on startup, exportable)
- Live config panel (toggle with `P`) for real-time adjustments
- Mapped burst elements: density, radius, burst consistency, individual flame size
- Mapped effects: color (random toggle), brightness, contrast, hue, saturation, tone
- Mapped shoot parameters: speed, acceleration, endpoint range (random toggle with min/max)
- Shoot consistency: random speed and acceleration with configurable min/max relative to slider values
- Pluggable color tools via dropdown: Color Wheel, Color Input, Color Swatches, Color Harmony
- Export JSON button downloads the active burst configuration
- Physics-based particles with gravity pull and velocity decay
- Rocket trail and burst afterglow sub-particles
- Procedural city skyline silhouette background
- Twinkling star field
- Adjustable aim angle and launch power
- Six randomised colour palettes per launch (when color random is enabled)

## Controls

| Input | Action |
|-------|--------|
| Arrow Left / A | Aim launcher left |
| Arrow Right / D | Aim launcher right |
| Arrow Up / W | Increase launch power |
| Arrow Down / S | Decrease launch power |
| Space | Launch firework |
| 1 | Classic Boom burst |
| 2 | Ring Halo burst |
| 3 | Star Scatter burst |
| 4 | Willow Cascade burst |
| P | Toggle config panel |

## Burst Types

| Type | Description |
|------|-------------|
| Classic Boom | Spherical explosion radiating outward with gentle gravity pull. Density and radius are configurable. |
| Ring Halo | Concentric rings of particles expanding outward with a bright center flash. Ring count is procedural. |
| Star Scatter | Five-armed star pattern with directional particle streams and cross-flash lines at the center. |
| Willow Cascade | Particles arc outward then droop heavily under strong gravity, leaving dense trailing afterglow. |

## Configuration

Press `P` to open the config panel. Each burst type has its own configuration that persists while the page is open. Switch burst types (1-4 or right panel buttons) and the config panel updates to show that type's settings.

### Config Sections

**Burst Elements** control the explosion shape:
- **Density** (10-150) -- number of burst particles
- **Radius** (30-400) -- spread speed of particles
- **Consistency** (0-1) -- uniformity of spread pattern (higher = more even)
- **Flame Size** (0.5-5.0) -- individual particle radius

**Effects** control colour and visual processing:
- **Color Random** (toggle) -- when ON, picks from six random palettes; when OFF, uses configured color
- **Color** -- base colour used when random is off
- **Color Tool** (dropdown) -- selects which colour picker to display: Color Wheel, Color Input, Color Swatches, or Color Harmony
- **Brightness** (0-2) -- multiplier applied to all burst colours
- **Contrast** (0-2) -- contrast adjustment around midpoint
- **Hue** (0-360) -- hue rotation in degrees
- **Saturation** (0-2) -- saturation multiplier
- **Tone** (0-1) -- darken (< 0.5) or lighten (> 0.5)

**Shoot** controls launch behaviour:
- **Speed** (100-1000) -- base rocket speed
- **Acceleration** (10-200) -- gravity drag on rocket during flight
- **End Burst Random** (toggle) -- randomise detonation point
  - **Max Range** / **Min Range** -- fuse time multiplier bounds when random

**Shoot Consistency** adds variation per launch:
- **Speed Random** (toggle) -- randomise speed per launch
  - **Speed Min** / **Speed Max** -- multiplier range relative to the Speed slider value
- **Accel Random** (toggle) -- randomise acceleration per launch
  - **Accel Min** / **Accel Max** -- multiplier range relative to the Acceleration slider value

### Export JSON

Click **Export JSON** at the bottom of the config panel to download the current burst type's configuration. The exported file matches the corresponding JSON config file (`classicBoom.json`, `ringHalo.json`, `starScatter.json`, or `willowCascade.json`). Drop the exported file back into the `firework-burst-launch/` folder to load it on next page load.

## JSON Config Schema

Each burst config JSON follows this structure:

```json
{
  "version": "1.0",
  "name": "Classic Boom",
  "burst": {
    "density": 60,
    "radius": 180,
    "consistency": 0.7,
    "flameSize": 2.0
  },
  "effects": {
    "colorRandom": true,
    "color": "#ff4444",
    "colorTool": "colorWheel",
    "brightness": 1.0,
    "contrast": 1.0,
    "hue": 0,
    "saturation": 1.0,
    "tone": 0.5
  },
  "shoot": {
    "speed": 500,
    "acceleration": 80,
    "endBurstRandom": true,
    "endpointMaxRange": 0.9,
    "endpointMinRange": 0.4,
    "consistency": {
      "speedRandom": false,
      "speedMin": 0.7,
      "speedMax": 1.3,
      "accelerationRandom": false,
      "accelerationMin": 0.7,
      "accelerationMax": 1.3
    }
  },
  "exportedAt": null
}
```

## Color Tools

Color tools are generic, reusable modules stored in `tools/colorMaps/`. They are not specific to firework-burst-launch and can be imported by any element in the project. Select them via the **Color Tool** dropdown in the Effects section (visible when Color Random is off).

| Tool | File | Description |
|------|------|-------------|
| Color Wheel | `colorWheel.js` | Interactive HSL colour wheel with lightness slider |
| Color Input | `colorInput.js` | Direct text input with HEX and RGB mode toggle |
| Color Swatches | `colorSwatches.js` | Grid of predefined colour swatches for quick selection |
| Color Harmony | `colorHarmony.js` | Generates harmonious palettes (complementary, analogous, triadic, split-comp, tetradic) from a base hue |

All tools register on `window.ColorMaps` and expose a `.create(container, options)` factory. Any page can import them via `<script src="../tools/colorMaps/<toolName>.js">`.

## Quick Start

Serve the repo root (or this folder) with any static HTTP server:

```bash
# Node.js
npx serve .

# Python 3
python -m http.server

# PHP
php -S localhost:8000
```

Open `index.html` in a browser.

## File Structure

```
firework-burst-launch/
  index.html            # Main demo (SVG + vanilla JS + config panel)
  classicBoom.json      # Classic Boom burst configuration
  ringHalo.json         # Ring Halo burst configuration
  starScatter.json      # Star Scatter burst configuration
  willowCascade.json    # Willow Cascade burst configuration
  README.md

tools/colorMaps/        # Generic, reusable colour tools
  colorWheel.js         # HSL colour wheel picker
  colorInput.js         # HEX / RGB text input
  colorSwatches.js      # Predefined swatch grid
  colorHarmony.js       # Colour harmony palette generator
```

## Data Flow

```
JSON config files (classicBoom.json, etc.)
  |
  v
index.html loads via fetch() on startup
  |
  v
Config panel displays current values
  |
  v
User adjusts sliders/toggles -> updates live config object
  |
  v
Next firework launch uses updated config for speed, burst, effects
  |
  v
Export JSON button -> downloads updated config as JSON file
  |
  v
Drop exported JSON back into folder -> auto-loaded on next page load
```

## How It Works

### Rendering

The entire scene is rendered inside a single `<svg>` element sized to the viewport. Background stars, the city skyline, the launcher, rockets, burst particles, and trails are all SVG elements created and removed dynamically via `document.createElementNS`.

### Physics

Rockets travel along the aimed trajectory with configurable gravity drag (acceleration). On detonation, burst particles receive radial velocities scaled by the config's radius and are pulled downward by per-particle gravity constants. Willow particles use heavier gravity to create the drooping cascade effect. All particles fade and shrink over their lifetime.

### Effects Pipeline

When colours are selected (random palette or configured), they pass through the effects pipeline: brightness, contrast, hue rotation, saturation adjustment, and tone shift. This allows global colour tuning per burst type.

### Shoot Consistency

When speed or acceleration random is enabled, each launch applies a random multiplier within the configured min/max range. These ranges are relative to the slider value (e.g., speed=500 with min=0.7, max=1.3 yields 350-650 per launch).

### Trails

Both rockets and burst particles periodically spawn small fading SVG circles behind them. These trail particles are short-lived and create the afterglow streaks visible during flight and explosion.

### Colour

When Color Random is enabled, each launch randomly selects from six hand-picked colour palettes. When disabled, the configured colour generates a five-colour palette with hue and lightness variations. All palette colours pass through the effects pipeline.

## Game Element Usage

Each burst configuration is designed to be used as a standalone game element. Export the JSON for a specific burst type, then load it in another game element (e.g., `player-2d-slide`, `jet-controls`) to trigger firework effects with consistent, pre-tuned settings. The JSON files serve as the data contract between the firework editor and any consuming game.

## Dependencies

Vanilla JavaScript and inline SVG. Color tools in `tools/colorMaps/` are loaded via `<script>` tags. No build step, no package manager, no CDN imports required.

## Extending

- Add new burst types by writing a spawn function and registering it in the `BURST_FN` array
- Plug into another element (e.g. player-2d-slide) by triggering `launchFirework()` on a collision or gameplay event
- Add sound effects by playing `AudioContext` tones on launch and detonation
- Create multi-stage fireworks by spawning secondary bursts from particles mid-flight
- Add new color tools by creating a JS file in `tools/colorMaps/` that registers on `window.ColorMaps`
