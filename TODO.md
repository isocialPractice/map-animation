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

---

## New Map Types

### 2D Map Animations

- [ ] **Parallax fog layer reveal** — Multi-depth fog bands with configurable opacity and parallax scroll rate overlay any tilemap background. Each band scrolls at a different speed, creating atmospheric depth without additional geometry.
- [ ] **Animated lava flow tiles** — Looping sprite-frame lava tiles combined with a radial heat-shimmer canvas overlay using a sine-wave UV distortion pass applied to the tile layer above the lava region.
- [ ] **Day/night cycle lighting pass** — Canvas 2D globalCompositeOperation overlay that shifts ambient color temperature from warm daylight to cool moonlight using HSL lerp driven by a normalized time-of-day float.
- [ ] **Fog-of-war radial reveal** — Canvas mask animation expands a circular clip region centered on the player each frame, revealing explored map tiles with a soft feathered edge using `createRadialGradient`.
- [ ] **Earthquake shake + crack overlay** — Game-event-triggered screen shake using `canvas.style.transform` translate jitter, paired with procedurally placed SVG crack sprites that fade in on the static tile layer.
- [ ] **Sine-wave water tile ripple** — Animated water tiles rendered with a per-row canvas vertical offset driven by `Math.sin(time + col)`, creating a rolling wave effect across wide water regions.
- [ ] **Isometric tile flip reveal** — Map discovery animation where newly uncovered tiles rotate in using CSS `rotateX` perspective transition, flipping from a face-down dark tile to the revealed terrain face.
- [ ] **Wind-driven foliage sway** — CSS `transform: rotate()` sine-wave animation applied to layered SVG grass and tree sprites in the foreground parallax layer, keyed to a configurable `wind-strength` variable.
- [ ] **Rain splatter decal system** — Short-lived canvas `drawImage` stamps placed at random positions within the viewport on each frame at configurable rain density; each decal fades via alpha over 0.5 seconds.
- [ ] **Portal vortex swirl** — CSS `conic-gradient` spin animation on a circular overlay element placed at two connected map regions, scaling up on player proximity and triggering a scene-transition callback.
- [ ] **Biome dissolve wipe transition** — Pixel-dithering dissolve between two tilemap zone renders using an ordered Bayer matrix threshold against a 0–1 transition progress float on the canvas pixel buffer.
- [ ] **Conveyor belt tile scroll** — `background-position` CSS animation on conveyor belt tile rows synced to the physics velocity of objects resting on them, reversing direction with the belt's configured speed property.

#### Board

- [ ] **Hex tile card-flip reveal** — CSS 3D `rotateY(180deg)` transition on individual hex tile elements, showing a dark back-face until revealed, then flipping to the terrain face on board-state update.
- [ ] **Animated valid-move path tracer** — SVG `<polyline>` elements drawn along A\* path nodes with `stroke-dashoffset` animation advancing from origin to destination, highlighting legal moves on piece selection.
- [ ] **Fog-of-war turn-expand clip** — Canvas `clip()` region grows by one tile radius each turn from the player's origin, with a soft feathered edge created by a radial gradient mask composite.
- [ ] **Piece snap + glow ring confirmation** — On snap-to-grid placement, a CSS `box-shadow` pulse keyframe fires on the target tile — scaling the glow ring outward and fading to transparent — confirming the piece drop.

#### Card

- [ ] **Shuffle and deal arc trajectory** — Cards animate along a cubic Bézier path from the deck position to each hand slot using `requestAnimationFrame`, with staggered delay per card and a slight arc height for visual weight.
- [ ] **Flip-zoom back-face reveal** — CSS `perspective` + `rotateY` flip with `backface-visibility: hidden` on front and back elements; the back face swaps in at the 90° midpoint to reveal the card face cleanly.
- [ ] **Holographic foil shimmer** — CSS `conic-gradient` rotated overlay with low opacity and `mix-blend-mode: color-dodge` applied on hover of rare cards, creating an iridescent shimmer effect responsive to mouse position.
- [ ] **Hand fan spring drag** — Physics-based card drag using spring constants (stiffness, damping) to pull cards back to their fan-arc resting positions on release, with neighboring cards rebalancing their angles.
- [ ] **Burn/dissolve discard animation** — On card removal, a canvas particle emitter fires orange-red particles from the card's bounding rect while the card's opacity and scale reduce to zero over 400ms.

---

### 3D Map Animations

- [ ] **Procedural impact terrain deformation** — On player landing, a radial area of `BufferGeometry` vertices is displaced downward using a Gaussian falloff function, updating `positionAttribute.needsUpdate = true` each frame as it springs back.
- [ ] **Volumetric cloud biome transition** — Three.js `FogExp2` density lerps between biome values over 3 seconds on zone crossing, combined with a flat cloud-plane mesh scrolling via UV offset to suggest volumetric layering.
- [ ] **Cascading waterfall particle system** — A Three.js `Points` emitter on a cliff-edge spawn plane fires particles downward with gravity acceleration; splash particles spawn on contact with the base mesh using raycasting.
- [ ] **Wind foliage vertex shader** — A `ShaderMaterial` vertex shader applies `sin(u_time * speed + position.x * frequency)` displacement to the Y and Z axes of foliage mesh vertices, creating organic sway without CPU overhead.
- [ ] **Lava eruption event** — A timed game event fires a `THREE.Points` burst emitter at the crater, pulses a `PointLight` intensity via `Math.sin`, and applies a one-shot camera `position.y` sine-wave shake over 800ms.
- [ ] **Day/night skybox transition** — Two `CubeTextureLoader` environments are blended via a custom `ShaderMaterial` on a skybox mesh using a `u_blend` uniform, driven by a day-cycle normalized float updated each frame.
- [ ] **Snow accumulation on surfaces** — Each frame, a thin layer mesh scaling on the Y axis accumulates over surface geometry using a `lerp` toward a max-depth value; a scene-reset event sets the scale back to zero.
- [ ] **Destructible wall collapse** — A wall mesh is pre-split into convex fragments; on trigger, each fragment receives a `Cannon.js` impulse from the impact point, transitioning from kinematic to dynamic body with gravity enabled.
- [ ] **Bridge sway spring chain** — Bridge plank meshes are linked via spring constraint joints in `Cannon.js` with wind force applied as a lateral impulse each frame, creating procedural sway that responds to player weight.
- [ ] **Holographic scanline map reveal** — A `ShaderMaterial` fragment shader scrolls a repeating horizontal line pattern using `fract(vUv.y * lineCount - u_time)` and pulses emissive intensity on a grid overlay mesh during map unlock.

#### Player

- [ ] **Shadow projection landing preview** — An orthographic shadow plane mesh is projected from the player's current XZ position downward via raycasting, showing the landing footprint before impact to aid jump targeting.
- [ ] **Motion trail ghost chain** — On fast-movement frames, the player mesh is cloned as a `MeshBasicMaterial` snapshot with starting opacity 0.4; each trail ghost opacity lerps to zero over 200ms and is removed from the scene.
- [ ] **Ragdoll-to-pose landing blend** — On high-velocity collision, `AnimationMixer.crossFadeTo()` transitions from the active locomotion clip to a landing-impact pose clip, with blend weight driven by impact velocity magnitude.

---

### Data

#### Inventory

- [ ] **Grid slot bounce-in stagger** — On inventory open, each item slot animates in with a CSS `transform: scale(0) → scale(1)` spring with staggered `animation-delay` calculated as `index * 40ms`.
- [ ] **Item tooltip slide-fade** — On slot hover, a tooltip panel translates from `translateY(8px)` to `translateY(0)` while fading from opacity 0 to 1 over 150ms; stat values count up using a rolling number tween.
- [ ] **Equipment swap cross-fade** — The outgoing item icon fades and scales down while the incoming item icon fades and scales up simultaneously on a character silhouette layer, confirming the equip action visually.

#### Decision

- [ ] **Choice branch radiate** — Decision option elements animate outward from a center node along equally spaced angles using `translate` with SVG arc connector lines drawn between node and options via `<path d>` attribute update.
- [ ] **Timer pressure ring** — An SVG `<circle>` with `stroke-dashoffset` countdown drives a clockface fill animation around the decision prompt, accelerating to red as the deadline approaches via color interpolation.

#### Use-item

- [ ] **Use ripple pulse** — Concentric SVG `<circle>` elements scale outward from the item's screen position on activation, fading to transparent at max radius — identical to a Material Design ripple but anchored to the item slot.
- [ ] **Cooldown conic sweep** — A `conic-gradient` overlay on the item slot rotates from 0 to 360° over the cooldown duration using a CSS `@keyframes` animation, visually communicating remaining cooldown time.
- [ ] **Consumption drain fade** — On item use, the slot icon's opacity reduces to 0 and scale shrinks to 0.8 over 300ms via CSS transition, then the slot either empties or updates to the reduced stack count.

#### Dialogue

- [ ] **Typewriter character reveal** — Each character in the dialogue string is appended to a display element via `requestAnimationFrame` at a configurable characters-per-second rate, with a blinking cursor element appended at the tail.
- [ ] **Speaker portrait slide-in** — The NPC portrait panel translates from `translateX(-100%)` to `translateX(0)` while the name plate fades up from below on dialogue open, both using CSS transitions with `ease-out` timing.
- [ ] **Emotion bubble pop** — The dialogue speech bubble element scales from `scale(0)` to `scale(1)` with a spring overshoot (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`) on trigger, with tail origin anchored to the speaker.
- [ ] **Scroll-advance ripple** — A subtle canvas sine wave sweeps across the text box background on the player's advance-dialogue input, providing tactile feedback that the next line has been queued.

#### Pause-screen

- [ ] **Backdrop blur vignette freeze** — On pause, a `backdrop-filter: blur()` overlay fades in over the game canvas with a darkening vignette gradient; menu items stagger-slide from `translateY(20px)` to `translateY(0)` sequentially.

#### Hint

- [ ] **Hint glow pulse ring** — A CSS `box-shadow` keyframe animation cycles from 0 to 12px spread on the hint trigger element, looping until the player dismisses or acts on the hint.
- [ ] **Bouncing arrow pointer** — A CSS `translateY` spring-loop animation on an SVG arrow element points toward the hint target, bouncing with `ease-in-out` timing to draw attention without being intrusive.

#### Highlight-object-is-interactible

- [ ] **Three.js OutlinePass glow** — On pointer-proximity detection via raycasting, the interactable mesh is added to the `OutlinePass` selected objects array, rendering a colored rim-glow outline using the post-processing pipeline.
- [ ] **Floating interaction prompt billboard** — A `THREE.Sprite` with a canvas-rendered prompt texture (e.g., "Press E") is parented above the object and applies a `Math.sin(time)` scale pulse to draw player attention.
- [ ] **In-range scanline shimmer** — A `ShaderMaterial` fragment shader on the object applies a UV-based horizontal line sweep (`fract(vUv.y * 8.0 - u_time * 2.0)`) when the player enters the interaction radius, then stops on exit.

#### Earn-trophy

- [ ] **Trophy burst-in spring** — The trophy icon animates from `scale(0)` to `scale(1.2)` then settles to `scale(1)` using a spring overshoot, while a canvas radial particle burst fires confetti from the icon center.
- [ ] **Banner slide-down notification** — A top-edge notification card translates from `translateY(-100%)` to `translateY(0)` with `ease-out`, holds for 3 seconds displaying the trophy icon spin and title, then slides back up.

#### Game-credits

- [ ] **Parallax starfield scroll** — A canvas layer behind the credits text renders procedural stars scrolling upward at varying speeds by layer depth, creating a sense of traveling through space as the credits roll.
- [ ] **Name fade cascade** — Each credit entry's opacity transitions from 0 to 1 as it enters the top third of the viewport, triggered by an `IntersectionObserver` on the scrolling container, giving each name focus on arrival.
- [ ] **Final title hold zoom** — Credits culminate with the game title centered, scaling slowly from `scale(0.95)` to `scale(1.0)` over 4 seconds with a radial bloom glow pulse on a canvas overlay behind the text.

#### Open-screen

- [ ] **Cinematic letterbox reveal** — Black bars at top and bottom animate inward via `scaleY` from edges as the title logo fades in from opacity 0 and scales up from `scale(0.9)`, establishing a cinematic feel on load.
- [ ] **Particle assembly logo** — Individual dot particles are positioned at random offsets and tween to their target positions on the letter paths of the game logo using a spring interpolation, assembling the title over 1.5 seconds.

#### Open-screen: Open-menu

- [ ] **Menu item stagger elastic reveal** — On menu open, each menu item translates from `translateY(30px)` to `translateY(0)` with `cubic-bezier(0.175, 0.885, 0.32, 1.275)` easing and staggered delay, while a frosted-glass backdrop settles behind them.

#### Settings

- [ ] **Toggle switch slide transition** — Boolean settings use a pill-shaped `<div>` with an inner knob that translates via CSS `transform: translateX()` and background-color transitions from gray to accent color on toggle.
- [ ] **Slider knob live value tween** — The value label next to the range input updates via a `requestAnimationFrame` counter tween from old to new value on drag release, with a canvas redraw showing the effect in a mini-preview.
- [ ] **Settings tab cross-fade** — On tab selection, the outgoing settings panel translates and fades to the left (`translateX(-20px)`, opacity 0) while the incoming panel enters from the right (`translateX(20px)` → `translateX(0)`, opacity 1).

#### Opening-credits

- [ ] **Studio logo hold sequence** — The studio logo fades in over 1 second with a subtle `scale(1.02)` breathe pulse, holds for 3 seconds, then fades to black before the game's opening sequence begins.
- [ ] **Role wipe title card** — Each "Directed by / Written by" credit card wipes in from the left using a CSS `clip-path: polygon()` animation expanding the visible area, holds 2 seconds, then wipes out to the right.

#### Tutorial

- [ ] **Hotkey badge pulse** — SVG key-cap elements for the relevant control glow with a scale and box-shadow cycle animation, drawing attention to the input hint overlay anchored to the relevant UI region.
- [ ] **Step progress dot trail** — A horizontal row of step indicator dots fills from left to right as the player completes each tutorial objective; each dot transitions from outline to filled with an `ease-out` scale animation.
- [ ] **Contextual arrow bounce overlay** — An SVG arrow element positioned over the relevant screen region animates a `translateY` bounce loop toward the interaction target, auto-repositioning when the target element moves.
- [ ] **Ghost-action preview loop** — A semi-transparent player-ghost sprite performs the required tutorial action as a looping animation (e.g., jump, attack, dodge), pausing when the real player begins the input to avoid distraction.
