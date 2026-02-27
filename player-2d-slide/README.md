# Player 2D Slide

A 2D platformer rendered with Three.js in an orthographic view. A cyan player cube moves, jumps, and slides across a procedurally generated level filled with passive enemies, harmful enemies, and interactive objects. Every gameplay parameter is driven by JSON configuration files that can be adjusted live via the config panel and exported for use as game elements.

## Features

- Physics-based movement with gravity, velocity, and AABB collision
- Jump buffer and coyote time for responsive platformer controls
- Three entity types: passive (purple), harmful (red), interactive (yellow)
- Health system with damage cooldown and invincibility frames
- Squash-and-stretch visual feedback on movement and landing
- SVG particle overlay with dust trails, surprise bursts, damage shockwaves, and lightning
- JSON-driven configuration per domain (loaded on startup, exportable)
- Live config panel (toggle with `P`) with five tabbed sections
- Pluggable color tools via dropdown: Color Wheel, Color Input, Color Swatches, Color Harmony
- Export JSON button downloads the active tab's configuration
- Atmosphere system with weather particles, player ghost trail, and time warp
- Smooth camera follow with configurable screen shake

## Controls

| Input | Action |
|-------|--------|
| Arrow Left / A | Move left |
| Arrow Right / D | Move right |
| Space / Arrow Up | Jump |
| P | Toggle config panel |

### Movement Details

- **Jump buffer** (0.15 s) -- press jump slightly before landing and it fires on contact.
- **Coyote time** (0.12 s) -- jump briefly after walking off an edge.
- **Enemy bounce** -- landing on a harmful enemy bounces the player upward at half jump velocity.

## Configuration

Press `P` to open the config panel. Five tabs organise all configurable parameters by domain. Changes to physics, particles, camera, and atmosphere take effect immediately. Entity changes (counts, size ranges) require clicking **Rebuild Level** in the Entities tab.

### Config Tabs

**Physics** -- Player movement, health, and visual feedback:
- **Movement**: Speed (1-30), Gravity (5-60), Jump Velocity, Player Size, Coyote Time, Jump Buffer
- **Health**: Max HP (1-20), Damage Cooldown, Hurt Flash Duration, Knockback Force, Bounce Multiplier
- **Squash & Stretch**: Toggle, Ground Squash, Air Stretch, Tilt Amount

**Entities** -- Enemy and interactive object parameters:
- **Passive Enemies**: Count, Bob Speed/Height, Squash Y/X, Recover Time
- **Harmful Enemies**: Count, Bob Speed/Height, Wobble Speed/Angle, Pulse Speed, Emissive Base/Pulse, Squash Y/X, Recover Time
- **Interactive**: Count, Float Speed/Height, Glow Intensity/Pulse Speed/Delta, Carry Speed Factor
- **Bird**: Speed Min/Max, Lift Min/Max, Flap Rate/Angle, Lifespan

**Particles** -- All SVG particle effects with toggle per layer:
- **Dust Trail**: Count, Spawn Interval, Radius, Velocity, Lifetime
- **Dust Burst**: Count, Radius, Velocity, Lifetime
- **Enemy Land FX**: Symbol Count, Velocity, Lifetime, Starburst Size
- **Damage FX**: Shockwave Count/Radius, Skull Count/Velocity, Lightning Count, Text Size, Vignette Opacity, Shake Duration
- **Interactive FX**: Glow On/Off Radius, Sparkle Count/Velocity

**Camera** -- View, lighting, and background:
- **View**: Frustum Height (10-40), Follow Smoothing, Base Y
- **Screen Shake**: Duration, Intensity
- **Ambient Light**: Intensity
- **Directional Light**: Intensity, Position X/Y/Z
- **Stars**: Count (0-100)

**Atmosphere** -- Weather, player trail, and time warp (surprise features):
- **Weather**: Toggle, Type (Fireflies/Rain/Snow/Dust Motes), Density, Speed, Drift, Opacity, Size, Pulse Speed, Color + Color Tool dropdown
- **Player Trail**: Toggle, Ghost Count, Spacing, Fade Rate, Color + Color Tool dropdown
- **Time Warp**: Toggle, Trigger (Enemy Land/Damage/Jump), Slow Factor, Duration, Ease Back

### Export JSON

Click **Export JSON** at the bottom of the config panel to download the current tab's configuration. The exported file matches the corresponding JSON config (e.g. `playerPhysics.json`, `atmosphere.json`). Drop the exported file back into the `player-2d-slide/` folder to load it on next page load.

## JSON Config Schema

### playerPhysics.json

```json
{
  "version": "1.0",
  "name": "Player Physics",
  "movement": {
    "speed": 10,
    "gravity": -32,
    "jumpVelocity": 15,
    "playerSize": 1,
    "coyoteTime": 0.12,
    "jumpBuffer": 0.15
  },
  "health": {
    "maxHP": 5,
    "damageCooldown": 1.0,
    "hurtFlashDuration": 0.5,
    "knockbackForce": 2,
    "bounceMultiplier": 0.5
  },
  "squashStretch": {
    "enabled": true,
    "groundSquash": 0.01,
    "airStretch": 0.005,
    "tiltAmount": 0.02
  },
  "exportedAt": null
}
```

### entityBehavior.json

```json
{
  "version": "1.0",
  "name": "Entity Behavior",
  "passive": {
    "count": 5,
    "bobSpeed": 1.5,
    "bobHeight": 0.05,
    "squashOnLand": { "scaleY": 0.6, "scaleX": 1.4, "recoverMs": 250 },
    "sizeRange": { "widthMin": 1.0, "widthMax": 1.8, "heightMin": 0.8, "heightMax": 2.3 }
  },
  "harmful": { "..." : "same structure with wobble, pulse, emissive" },
  "interactive": { "count": 4, "floatSpeed": 2, "..." : "..." },
  "bird": { "speedMin": 1.5, "speedMax": 3.5, "..." : "..." },
  "exportedAt": null
}
```

### particleFX.json

```json
{
  "version": "1.0",
  "name": "Particle Effects",
  "dustTrail": { "enabled": true, "count": 2, "spawnInterval": 0.08, "..." : "..." },
  "dustBurst": { "count": 8, "..." : "..." },
  "enemyLandFX": { "enabled": true, "symbolCount": 6, "..." : "..." },
  "damage": { "enabled": true, "shockwaveCount": 3, "..." : "..." },
  "interactiveFX": { "enabled": true, "sparkleCount": 3, "..." : "..." },
  "exportedAt": null
}
```

### cameraRig.json

```json
{
  "version": "1.0",
  "name": "Camera Rig",
  "view": { "frustumHeight": 20, "followSmoothing": 0.08, "baseY": 2 },
  "screenShake": { "duration": 0.4, "intensity": 8 },
  "ambientLight": { "color": "#8899bb", "intensity": 0.6 },
  "directionalLight": { "color": "#ffeedd", "intensity": 0.8, "posX": 5, "posY": 10, "posZ": 8 },
  "background": { "clearColor": "#16213e", "starCount": 30, "..." : "..." },
  "exportedAt": null
}
```

### atmosphere.json

```json
{
  "version": "1.0",
  "name": "Atmosphere",
  "weather": {
    "enabled": true,
    "type": "fireflies",
    "density": 20,
    "speedMin": 10,
    "speedMax": 30,
    "driftX": 5,
    "driftY": 2,
    "color": "#feca57",
    "colorTool": "colorWheel",
    "pulseSpeed": 3
  },
  "playerTrail": {
    "enabled": true,
    "ghostCount": 4,
    "ghostSpacing": 0.06,
    "fadeRate": 0.25,
    "color": "#64c8ff",
    "colorTool": "colorWheel"
  },
  "timeWarp": {
    "enabled": true,
    "triggerOn": "enemyLand",
    "slowFactor": 0.3,
    "duration": 0.6,
    "easeBack": 0.3
  },
  "exportedAt": null
}
```

## Atmosphere Features

### Weather System

Four weather types render as ambient SVG particles across the viewport:

| Type | Behaviour |
|------|-----------|
| Fireflies | Yellow dots that wander randomly with pulsing opacity |
| Rain | Small angled lines falling fast with wind drift |
| Snow | White circles drifting downward with sine wobble |
| Dust Motes | Tiny dots floating slowly in random directions |

All weather particles wrap around screen edges. Color is configurable via the Color Tool dropdown.

### Player Trail

Semi-transparent ghost afterimages follow the player, creating a motion blur effect. Configurable number of ghosts (1-10), time spacing between each ghost, fade rate, and trail color (via Color Tool).

### Time Warp

Temporal slow-motion triggered by configurable events (enemy landing, taking damage, or jumping). When triggered, game time scales down to the configured slow factor, holds for the set duration, then eases back to normal speed with a quadratic curve. A blue vignette overlay provides visual feedback during the warp.

## Color Tools

Color tools are generic, reusable modules stored in `tools/colorMaps/`. They are shared across all project elements. Select them via the **Color Tool** dropdown in the Atmosphere tab.

| Tool | File | Description |
|------|------|-------------|
| Color Wheel | `colorWheel.js` | Interactive HSL colour wheel with lightness slider |
| Color Input | `colorInput.js` | Direct text input with HEX and RGB mode toggle |
| Color Swatches | `colorSwatches.js` | Grid of predefined colour swatches for quick selection |
| Color Harmony | `colorHarmony.js` | Generates harmonious palettes from a base hue |

## Entities

| Entity | Color | Behaviour |
|--------|-------|-----------|
| Passive enemy | Purple | Bobs in place. Landing on it triggers a surprise squash animation and time warp. |
| Harmful enemy | Red | Bobs and pulses with an emissive glow. Side contact deals 1 damage. Landing on top bounces the player. |
| Interactive object | Yellow | Floats in place. Landing picks it up and carries it. Side contact toggles its light. Jumping nearby sends it flying away as a bird. |

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
player-2d-slide/
  index.html            # Main demo (Three.js + SVG particles + config panel)
  playerPhysics.json    # Player movement and health configuration
  entityBehavior.json   # Enemy and interactive object configuration
  particleFX.json       # Particle effect configuration
  cameraRig.json        # Camera, lighting, and background configuration
  atmosphere.json       # Weather, player trail, and time warp configuration
  README.md

tools/colorMaps/        # Generic, reusable colour tools
  colorWheel.js         # HSL colour wheel picker
  colorInput.js         # HEX / RGB text input
  colorSwatches.js      # Predefined swatch grid
  colorHarmony.js       # Colour harmony palette generator
```

## Data Flow

```
JSON config files (playerPhysics.json, etc.)
  |
  v
index.html loads via fetch() on startup
  |
  v
Config panel displays current values (5 tabbed sections)
  |
  v
User adjusts sliders/toggles/dropdowns -> updates live config object
  |
  v
Next frame uses updated config for physics, entities, particles, camera, atmosphere
  |
  v
Export JSON button -> downloads updated config as JSON file
  |
  v
Drop exported JSON back into folder -> auto-loaded on next page load
```

## How It Works

### Rendering

The scene uses a Three.js `WebGLRenderer` with an `OrthographicCamera` for a flat 2D look. The frustum height is configurable (default 20 world units). Materials are `MeshStandardMaterial` (PBR) lit by a cool ambient light and a warm directional light, both configurable.

Particle effects and weather are rendered in a separate SVG element layered on top of the WebGL canvas. World positions are projected to screen coordinates via the Three.js camera so particles stay attached to 3D entities.

### Physics

Gravity, jump velocity, move speed, coyote time, and jump buffer are all configurable via the Physics tab. Collision detection uses AABB overlap checks. Top-landing is detected by comparing the player's previous-frame Y against the surface top with a small tolerance.

### Level Generation

Entities are placed procedurally with a seeded random function (seed 42). Entity counts, size ranges, and animation parameters are driven by the Entity Behavior config. Click **Rebuild Level** in the Entities tab to regenerate with new settings.

### Time Warp

When triggered, the raw `deltaTime` from the game clock is multiplied by a slow factor (default 0.3). The warp holds for a configurable duration, then eases back to factor 1.0 with a quadratic curve. A translucent blue vignette SVG rect overlays the viewport during the warp.

### Player Trail

Ghost afterimages are pre-allocated Three.js meshes (up to 10). Each frame, the player's position is pushed into a time-stamped ring buffer. Each ghost reads from a historical position `(i + 1) * ghostSpacing` seconds in the past, with decreasing opacity.

## Game Element Usage

Each configuration JSON is designed to be used as a standalone game element. Export the JSON for a specific domain, then load it in another game element (e.g., `jet-controls`, `firework-burst-launch`) to apply consistent, pre-tuned settings. The JSON files serve as the data contract between the config editor and any consuming game.

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [Three.js](https://threejs.org/) | 0.160.0 | WebGL rendering, camera, lighting, geometry |

Loaded via CDN import map. Color tools in `tools/colorMaps/` are loaded via `<script>` tags. No build step or package manager required.

## Extending

- Add new entity types by following the passive/harmful/interactive pattern and registering them in the collision loop and config schema
- Plug in another mapped-animation element by importing its animation API and binding it to a keypress or collision event
- Add new weather types by extending the switch statement in `updateWeather()` and adding an option to the dropdown
- Add new time warp triggers by checking the `triggerOn` value at additional game events
- Add new color tools by creating a JS file in `tools/colorMaps/` that registers on `window.ColorMaps`
