# TODO

Tracked ideas, assets, improvements, and updates for the map-animation project.

---

## New Ideas

- [ ] **Water Surface Simulation** — A standalone 2D/3D element using vertex displacement and reflective shaders to render an interactive water plane. Keyboard controls ripple intensity and wave direction. Exportable wave configuration as JSON for use in stage environments.
- [ ] **Terrain Height Map Editor** — A Three.js tool that loads a grayscale heightmap image and renders it as a 3D terrain mesh. Includes a paint-style brush to raise/lower terrain, export the modified heightmap, and place camera waypoints for flyover previews.
- [ ] **Sound Wave Visualizer Element** — A pure SVG element that maps audio frequency data to animated waveform bars or radial patterns. Accepts mic input or a loaded audio file. Could serve as an in-game jukebox or audio-reactive stage backdrop.
- [ ] **Weather Particle System** — A composable weather layer (rain, snow, fog, dust storm) rendered as SVG or canvas particles overlaid on any existing demo. Configurable density, wind direction, and particle size via a slider panel. Exportable as a reusable JSON preset.
- [ ] **Multiplayer Lobby Prototype** — A minimal WebSocket-based lobby screen where two browser tabs can connect, assign player colors, and synchronize a shared cursor position on a blank stage. Foundation for future networked gameplay between elements.

---

## Assets

- [ ] Create new `jet.stl` 3D model
- [ ] **Low-poly spacecraft STL** — A stylized spaceship model to use as an alternative to the jet, with multiple thruster points for flame placement.
- [ ] **Modular building block STLs** — A set of 4-5 simple geometric building pieces (wall, ramp, arch, platform, pillar) for constructing 3D obstacle courses or stages.
- [ ] **Pixel-art sprite sheet (PNG)** — A 16x16 tile sprite sheet for the player-2d-slide demo, replacing the cyan cube with an animated character (idle, run, jump, hurt frames).
- [ ] **City skyline SVG set** — Hand-drawn vector skyline silhouettes (3 variations: downtown, suburban, industrial) to swap into the firework-burst-launch background.
- [ ] **Explosion sprite atlas (PNG)** — A frame-by-frame explosion sequence (8-12 frames) usable as a billboard texture in Three.js demos when projectiles or objects collide.
- [ ] **HDR environment map** — A low-res equirectangular HDR image for ambient lighting and reflections on metallic 3D models, improving visual quality without heavy file size.
- [ ] **Sound effect pack (MP3/OGG)** — Short audio clips for common actions: jump, land, damage-taken, firework-launch, firework-burst, flame-ignite. Keeps demos zero-dependency by embedding as base64 or loading from an `assets/audio/` folder.

---

## Minor Updates / Improvements

- [ ] **Add keyboard shortcut overlay** — Display a small toggleable help panel (press `?`) in each demo listing all available controls. Reduces guesswork for first-time users.
- [ ] **Persist editor state to localStorage** — In jet-engine-flame and jet-camera-position, save the current gizmo positions, slider values, and camera angle to localStorage so refreshing the page doesn't lose work-in-progress edits.
- [ ] **Improve mobile touch support for firework-burst-launch** — Map touch-drag to aim angle and tap to fire, allowing the firework demo to be playable on phones and tablets without a keyboard.
- [ ] **Add FPS counter toggle to all demos** — A minimal frames-per-second readout (top-right corner, toggled with backtick key) to help diagnose performance across devices during development.

---

## Major Updates to Existing Mapped Animations

- [ ] **Player 2D Slide — Full level editor with save/load** — Add a drag-and-drop level editor mode to player-2d-slide that lets users place, resize, and configure enemies, platforms, and interactables on a grid. Levels export as JSON and can be loaded from a file picker or URL parameter, enabling shareable custom stages.
- [ ] **Jet Camera Position — Multi-keyframe timeline** — Replace the current three-animation sequence with a general-purpose keyframe timeline. Users place unlimited camera keyframes on a visual timeline bar, each with independent position, target, FOV, easing, and duration. Playback scrubs through keyframes in order. Supports looping, ping-pong, and hold modes. Exports the full timeline as a single JSON array for cinematic camera paths.

---

## Miscellaneous

- [ ] **Easter egg: Konami Code unlockable** — Wire up the classic Konami Code (up-up-down-down-left-right-left-right-B-A) on the main landing page. Triggering it inverts the color palette to a retro green-on-black CRT theme, adds a scanline CSS overlay, and plays a short 8-bit jingle via the Web Audio API. Persists the theme in localStorage until toggled off.
- [ ] **Cross-demo portal system** — Add a hidden "portal" element (a glowing ring) to both the player-2d-slide and firework-burst-launch demos. Walking into the portal in player-2d-slide or launching a firework through one in firework-burst-launch navigates to the other demo, passing the player's current color and score as URL parameters so the destination demo can pick up where the origin left off.
