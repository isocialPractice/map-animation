# Jet Engine Flame

Source file for [jet.stl](https://free3d.com/3d-model/learjet-25-atlasjet-42833.html)

A 3D interactive demo that loads a jet STL model and maps animated SVG-style engine flame effects to the jet's exhaust ports. Flames are positioned in 3D world space so they naturally rotate, zoom, and pan with all camera movements - appearing as if fused to the 3D model.

## Features

- **3D model viewer** - rotate, zoom, and pan around the jet using OrbitControls
- **Procedural flame animation** - canvas-rendered SVG-style flame with layered bezier shapes, radial gradients, and organic flickering
- **3D-anchored sprites** - `THREE.Sprite` objects placed in world space so flames follow every camera movement
- **Engine glow** - a point light activates at the exhaust when flames are on, illuminating the surrounding model geometry
- **Orientation heuristic** - auto-detects fuselage axis from the bounding box to place flames at the correct rear position
- **Game-ready keypress API** - toggle flames with a single key; easy to wire into any game loop

## Controls

| Input | Action |
|-------|--------|
| `Left-drag` | Rotate |
| `Scroll` | Zoom |
| `Right-drag` | Pan |
| `F` | Toggle engine flames |
| `R` | Reset camera |
| `Click engine marker` | Select animation |
| `1` | Move mode (when selected) |
| `2` | Rotate mode (when selected) |
| `3` | Scale mode (when selected) |
| `Esc` | Deselect |

## Quick Start

A local HTTP server is required so the browser can load `jet.stl` via `fetch`.

```bash
# Node.js (npx - no install needed)
npx serve .

# Python 3
python -m http.server 8080

# PHP
php -S localhost:8080
```

Then open: **http://localhost:8080/jet-engine-flame/**

## File Structure

```
map-animation/
��� jet.stl                    # 3D jet model (STL binary or ASCII)
��� jet-engine-flame/
�   ��� index.html             # Self-contained Three.js demo
��� README.md                  # This file
```

## Animation Tools (Selection System)

Click the glowing sphere marker at any engine exhaust to select it. A dashed cyan bounding box appears around the selection. The bottom toolbar gives access to three standard 3D transform gizmos (same as Blender/Unity/Unreal style):

| Gizmo | Button | Key | Axes |
|-------|--------|-----|------|
| Translate | MOVE | `1` | RGB axis arrows + plane handles |
| Rotate | ROTATE | `2` | RGB rotation rings |
| Scale | SCALE | `3` | RGB scale handles |

Every transform change is immediately reflected in the live readout at the bottom of the screen and written into the internal JSON state object.

## Export Animation as JSON

The **? EXPORT JSON** button (top-right) downloads `jet-engine-flame.animation.json`. The file captures:

- Per-engine position, rotation (degrees), and scale
- Active state of each flame animation
- Appearance metadata (flame scale, sprite count, color stops, blending mode)
- Camera position and look-at target at export time

```json
{
  "version": "1.0",
  "model": "../jet.stl",
  "exportedAt": "2026-02-22T...",
  "animations": [
    {
      "id": "engine_0",
      "label": "Engine 1",
      "type": "flame",
      "active": false,
      "transform": {
        "position": { "x": 0.0,  "y": -0.12, "z": -1.5 },
        "rotation": { "x": 0.0,  "y": 0.0,   "z": 0.0  },
        "scale":    { "x": 1.0,  "y": 1.0,   "z": 1.0  }
      },
      "appearance": {
        "flameScale": 0.9,
        "spriteCount": 4,
        "blending": "additive",
        "colors": { "core": "#fffff0", "inner": "#ffcc20", "mid": "#ff5a0a", "outer": "#781000" }
      }
    }
  ],
  "scene": {
    "engineGlow": { "color": "#ff5500", "intensity": 3, "distance": 4 },
    "camera": { "position": {...}, "target": {...} }
  }
}
```

## How It Works

### STL Loading & Fitting

`STLLoader` loads `jet.stl` and the geometry is:
1. Centred at the origin via bounding-box translation
2. Uniformly scaled so the longest dimension is 3 units
3. Analysed to detect fuselage / wingspan / height axes

### Engine Position Heuristic

The longest bounding-box axis is treated as the fuselage (front  back). Flames are placed at the **minimum** end of that axis (the rear). If the wingspan exceeds 60 % of the fuselage length, two engines are placed side-by-side; otherwise a single centred exhaust is used.

To manually override flame positions, edit the `enginePositions` array inside `index.html` after the comment:
```js
//  You can override enginePositions[] below if the
//  flames appear at the wrong end or offset.
```

### SVG-Style Flame on Canvas

Each flame sprite runs `drawFlame()` every frame, which renders:

| Layer | Description |
|-------|-------------|
| Outer heat | Wide, transparent red-brown glow |
| Orange body | Main flame shape - slow sway |
| Yellow flame | Brighter, faster flicker |
| White core | Tight, near-static hot centre |

Each layer is a **bezier teardrop path** filled with a **radial gradient** - the same primitives used in SVG `<path>` + `<radialGradient>` animations, animated with time-based sine noise for organic flickering and swaying.

The canvas is assigned to a `THREE.CanvasTexture` on a `THREE.Sprite`. Because `Sprite` is a scene-graph object, it:
- Moves with the model in world space
- Rotates / zooms / pans with the camera
- Always billboards to face the viewer (standard game particle behaviour)
- Blends additively for a realistic fire glow

### Key Press Integration

```js
// The flame system exposes three handles you can wire into a game:
flameActive        // boolean state
flameGroup.visible // mirrors flameActive
engineGlow         // THREE.PointLight - set .intensity to taste
```

Listen for your game's thrust input and toggle these instead of the keyboard handler.

## Dependencies

All loaded from CDN - no install required.

| Package | Version | Purpose |
|---------|---------|---------|
| `three` | 0.169.0 | 3D renderer, scene graph, sprites |
| `three/addons/controls/OrbitControls` | 0.169.0 | Camera interaction |
| `three/addons/loaders/STLLoader` | 0.169.0 | STL model loading |

## Extending

- **Particle system** - replace `THREE.Sprite` with a `THREE.Points` particle emitter for higher-fidelity smoke/fire
- **Multiple effects** - call `makeEngineFlame()` for afterburner, contrail, or damage smoke at any world position
- **Game integration** - call `flameGroup.visible = thrustInput > 0` in your game loop; scale `flameScale` with thrust level
- **Custom STL** - swap `jet.stl` for any model; the heuristic will attempt to auto-place flames at the rear

