# Player 2D Slide

A 2D platformer rendered with Three.js in an orthographic view. A cyan player cube moves, jumps, and slides across a procedurally generated level filled with passive enemies, harmful enemies, and interactive objects. Keyboard controls map to physics-based movement, and a toggle panel lets you enable or disable each particle-effect layer independently.

## Features

- Physics-based movement with gravity, velocity, and AABB collision
- Jump buffer and coyote time for responsive platformer controls
- Three entity types: passive (purple), harmful (red), interactive (yellow)
- Health system with damage cooldown and invincibility frames
- Squash-and-stretch visual feedback on movement and landing
- SVG particle overlay with dust trails, surprise bursts, damage shockwaves, and lightning
- Real-time toggle panel to enable or disable each effect layer
- Smooth camera follow with screen shake on damage

## Controls

| Input | Action |
|-------|--------|
| Arrow Left / A | Move left |
| Arrow Right / D | Move right |
| Space / Arrow Up | Jump |

### Movement Details

- **Jump buffer** (0.15 s) -- press jump slightly before landing and it fires on contact.
- **Coyote time** (0.12 s) -- jump briefly after walking off an edge.
- **Enemy bounce** -- landing on a harmful enemy bounces the player upward at half jump velocity.

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
  index.html    # Self-contained demo (Three.js + SVG particles)
  README.md
```

## Entities

| Entity | Color | Behaviour |
|--------|-------|-----------|
| Passive enemy | Purple | Bobs in place. Landing on it triggers a surprise squash animation. |
| Harmful enemy | Red | Bobs and pulses with an emissive glow. Side contact deals 1 damage. Landing on top bounces the player. |
| Interactive object | Yellow | Floats in place. Landing picks it up and carries it. Side contact toggles its light. Jumping nearby sends it flying away as a bird. |

## Toggle Panel

A fixed panel on the right side of the screen controls four effect layers. All toggles default to **on**.

| Toggle | Effect |
|--------|--------|
| Dust Trail | Spawns brown dust particles while moving on the ground and a larger burst on landing. |
| Enemy Land FX | Radial burst of surprise symbols (!, ?, *) and a starburst polygon when landing on enemies. |
| Interactive FX | Glow circle on light toggle, sparkle-and-bird effect when jumping near interactive objects. |
| Damage FX | Concentric shockwave rings, skull-symbol rain, lightning bolts, floating "-1" text, and a red screen vignette on taking damage. |

## HUD

- **Control hints** -- top-left text showing input mappings.
- **Health bar** -- 120 px bar with a red gradient fill. Displays current HP as a number. Smoothly animates on damage.

## How It Works

### Rendering

The scene uses a Three.js `WebGLRenderer` with an `OrthographicCamera` for a flat 2D look. The frustum height is 20 world units. Materials are `MeshStandardMaterial` (PBR) lit by a cool ambient light and a warm directional light.

Particle effects are rendered in a separate SVG element layered on top of the WebGL canvas. World positions are projected to screen coordinates via the Three.js camera so particles stay attached to 3D entities.

### Physics

Gravity is a constant -32 units/s². The player moves at 10 units/s horizontally and jumps at 15 units/s. Collision detection uses AABB overlap checks. Top-landing is detected by comparing the player's previous-frame Y against the surface top with a small tolerance.

### Level Generation

Entities are placed procedurally with a seeded random function (seed 42): 5 passive enemies, 5 harmful enemies, 4 interactive objects, and 30 background stars across a 200-unit-wide ground plane.

## Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `GRAVITY` | -32 | Downward acceleration (units/s²) |
| `JUMP_VEL` | 15 | Initial upward velocity |
| `MOVE_SPEED` | 10 | Horizontal velocity |
| `GROUND_Y` | -4 | World Y of the ground surface |
| `MAX_HP` | 5 | Starting health |
| `DAMAGE_COOLDOWN` | 1.0 | Invincibility duration (seconds) |
| `COYOTE_TIME` | 0.12 | Grace period after leaving a surface |
| `JUMP_BUFFER` | 0.15 | Jump input memory window |

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [Three.js](https://threejs.org/) | 0.160.0 | WebGL rendering, camera, lighting, geometry |

Loaded via CDN import map. No build step or package manager required.

## Extending

- Swap the player cube for a sprite sheet to add character animation frames.
- Add new entity types by following the passive/harmful/interactive pattern and registering them in the collision loop.
- Plug in another mapped-animation element (e.g. jet-engine-flame) by importing its animation API and binding it to a keypress or collision event.
- Extend the toggle panel with additional effect layers by adding a button and a corresponding flag check in the particle spawn functions.
