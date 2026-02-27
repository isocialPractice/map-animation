# Map Animation

`ctrl + click` to run [demos](https://isocialpractice.github.io/map-animation/index.html).

![logo](logo.png) A collection of simple, self-contained game-engine elements built with vanilla JavaScript and HTML5. Each folder is a standalone demo that maps keyboard and mouse controls to a playable animation or interactive tool. Folders are named as minimal descriptions of the mapped animation or tool purpose.

Each element is designed to be plugged into any compatible element, allowing them to be composed together for more grandiose gameplay.

## Elements

### jet-engine-flame

A Three.js 3D interactive demo featuring procedural flame animation on a jet model. Supports camera orbit, zoom, pan, and an animation editor with transform gizmos for positioning flames in 3D space. Exports animation data as JSON for use in other tools.

Source file for [jet.stl](https://free3d.com/3d-model/learjet-25-atlasjet-42833.html).

### player-2d-slide

A 2D canvas-based platformer demo with a sliding player character. Includes physics, animation, and a real-time toggle panel for enabling and disabling different mechanics.

### jet-camera-position

A Three.js 3D camera positioning tool for configuring starting and play-state camera angles on a jet model. Preview camera animations (zoom, rotate, pan) with adjustable parameters, toggle each effect independently, and export camera positions and animation configs as JSON for plugging into other game elements.

### firework-burst-launch

A pure SVG firework launcher controlled by keyboard. Aim a turret, adjust power, and fire fireworks into a starlit sky above a city skyline. Four procedural burst types -- Classic Bloom, Ring Halo, Star Scatter, and Willow Cascade -- with gravity-pulled particles and trailing afterglow.

### jet-controls

A Three.js 3D demo that maps arrow key presses to simultaneous aircraft physics and engine flame animation. Each arrow key triggers both systems at once: the jet pitches or rolls, and the engines fire. The camera follows the jet in a fixed chase position sourced from `jet-camera-position/playAnimation.json`. Control logic is mimicked from `.support/aircraft.js` and flame animation is ported from `jet-engine-flame`.

### player-2d-climb

A Three.js 2D vertical climbing game with procedurally generated climb structures, dynamic obstacles, and atmospheric effects. Features a comprehensive stamina management system, wall latching mechanics, seven obstacle types (including enemy, danger, friendly, blocking, lighting, movable, and mystic), weather effects (clouds with lightning, rain), altitude-based environmental zones, and extensive particle effects for all interactions. Includes a live configuration panel with five tabs for real-time tweaking of player physics, obstacle behavior, climb structure generation, atmosphere settings, and visual effects. Exports all configurations as JSON for easy customization.

## Running

The root `index.html` is a launcher page that lists every element with a live preview and a link to open it. Serve the repo root with any static HTTP server and open `index.html` in a browser. No build step or package manager required.

Each element can also be opened directly from its own folder.
