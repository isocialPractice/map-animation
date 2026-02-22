# Firework Burst Launch

A pure SVG firework launcher controlled entirely by keyboard. Aim a launcher turret, adjust power, and fire fireworks into a starlit sky above a city skyline silhouette. Each firework detonates into one of four procedural burst patterns rendered as SVG particles with gravity, trails, and fade effects.

## Features

- Pure SVG rendering with no external dependencies
- Four burst types: Classic Bloom, Ring Halo, Star Scatter, Willow Cascade
- Physics-based particles with gravity pull and velocity decay
- Rocket trail and burst afterglow sub-particles
- Procedural city skyline silhouette background
- Twinkling star field
- Adjustable aim angle and launch power
- Six randomised colour palettes per launch

## Controls

| Input | Action |
|-------|--------|
| Arrow Left / A | Aim launcher left |
| Arrow Right / D | Aim launcher right |
| Arrow Up / W | Increase launch power |
| Arrow Down / S | Decrease launch power |
| Space | Launch firework |
| 1 | Classic Bloom burst |
| 2 | Ring Halo burst |
| 3 | Star Scatter burst |
| 4 | Willow Cascade burst |

## Burst Types

| Type | Description |
|------|-------------|
| Classic Bloom | Spherical explosion of 50-80 particles radiating outward with gentle gravity pull. |
| Ring Halo | Two concentric rings of particles expanding outward with a bright center flash. |
| Star Scatter | Five-armed star pattern with directional particle streams and cross-flash lines at the center. |
| Willow Cascade | Particles arc outward then droop heavily under strong gravity, leaving dense trailing afterglow like weeping willow branches. |

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
  index.html    # Self-contained demo (pure SVG + vanilla JS)
  README.md
```

## How It Works

### Rendering

The entire scene is rendered inside a single `<svg>` element sized to the viewport. Background stars, the city skyline, the launcher, rockets, burst particles, and trails are all SVG elements created and removed dynamically via `document.createElementNS`.

### Physics

Rockets travel along the aimed trajectory with a slight upward gravity drag. On detonation, burst particles receive radial velocities and are pulled downward by per-particle gravity constants. Willow particles use heavier gravity to create the drooping cascade effect. All particles fade and shrink over their lifetime.

### Trails

Both rockets and burst particles periodically spawn small fading SVG circles behind them. These trail particles are short-lived and create the afterglow streaks visible during flight and explosion.

### Colour

Each launch randomly selects from six hand-picked colour palettes. Burst particles sample colours from the selected palette to ensure visual coherence within each explosion while providing variety across launches.

## Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `LAUNCH_COOLDOWN` | 0.3 s | Minimum time between launches |
| `launcherPower` | 0.2 - 1.0 | Controls rocket speed and fuse time |
| `launcherAngle` | -160 to -12 deg | Aim arc (upward range) |
| Rocket gravity | 80 | Upward drag on rocket during flight |
| Classic particle count | 50-80 | Number of burst particles |
| Ring particle count | 30-50 per ring | Particles per concentric ring |
| Star arm count | 5 | Directional arms in star burst |
| Willow gravity | 100-140 | Heavy downward pull for cascade effect |

## Dependencies

None. Pure vanilla JavaScript and inline SVG. No build step, no package manager, no CDN imports required.

## Extending

- Add new burst types by writing a spawn function and registering it in the `BURST_FN` array.
- Plug into another element (e.g. player-2d-slide) by triggering `launchFirework()` on a collision or gameplay event.
- Add sound effects by playing `AudioContext` tones on launch and detonation.
- Create multi-stage fireworks by spawning secondary bursts from particles mid-flight.
