# 2D Vertical Climber

An endless vertical climbing game with dynamic obstacles, atmospheric effects, and extensive configuration options. Guide your climber through an ever-changing environment while managing stamina, avoiding dangers, and collecting power-ups.

## Features

### Core Gameplay
- **Vertical Climbing Mechanic**: Smooth climbing controls with stamina management
- **Latching System**: Press SHIFT to latch onto walls and rest (drains stamina slowly)
- **Dynamic Movement**: Climb, jump, and navigate through procedurally generated structures
- **Stamina Management**: Balance climbing speed with stamina consumption
- **Health System**: Take damage from obstacles and collect health power-ups

### Climb Structure
- **Procedural Generation**: Randomly generated climb segments based on seed
- **Walls with Gaps**: Navigate around gaps and restricted areas
- **Platforms**: Horizontal platforms with varying widths
- **Ledges**: Small ledges for resting and strategic positioning
- **Crumbling Surfaces**: Surprise! Some platforms crumble after being touched
- **Dynamic Textures**: Multiple texture options (stone, brick, ice, wood, vine, metal)
- **Wall Lighting**: Atmospheric light effects along walls

### Obstacles

#### Enemy (Red Spheres)
- Patrol horizontally with bobbing motion
- Drain stamina and health on collision
- Configurable patrol range and speed

#### Danger (Orange Cones)
- Pulsing hazards with glow effects
- Fall when player approaches (if enabled)
- High stamina drain on contact

#### Friendly (Green Octahedrons)
- Floating collectibles
- Restore stamina and health
- Grant temporary speed boost

#### Blocking (Blue Cubes)
- Static obstacles that block movement
- Optional pulsing light effects
- Cannot be destroyed

#### Lighting (Yellow Spheres)
- Provide ambient lighting
- Pulsing and flickering effects
- Illuminate nearby areas

#### Movable (Brown Platforms)
- Move horizontally back and forth
- Can be used as moving platforms
- Configurable range and speed

#### Mystic (Purple Toruses)
- **Surprise Feature!** Phase in and out of visibility
- Grant bonus stamina when collected
- Bonus health if caught while visible

### Atmospheric Effects

#### Clouds
- Drifting cloud layers with configurable:
  - Density (number of clouds)
  - Opacity
  - Vertical position
  - Drift speed
  - Size variation
- **Lightning Effects**: Random lightning flashes during storms

#### Rain
- Optional rain effects that:
  - Reduce player speed
  - Increase stamina drain
  - Add wet texture effects to obstacles
  - Configurable amount, drop speed, and wind angle

#### Altitude Zones
- Background color changes based on altitude:
  - **Ground** (0-50m): Deep blue-green
  - **Midway** (50-100m): Navy blue
  - **Clouds** (100-150m): Lighter blue
  - **Sky** (150-200m): Sky blue
  - **Space** (200m+): Dark space blue

#### Color Effects
- Global hue shift
- Saturation adjustment
- Brightness control
- Tint overlay

### Player Features

#### Movement
- **Speed**: Horizontal movement speed
- **Climb Speed**: Vertical climbing speed
- **Jump Height**: Configurable jump power
- **Gravity**: Adjustable gravity strength
- **Air Control**: Mid-air movement control

#### Stamina System
- **Max Stamina**: Total stamina capacity
- **Reload Time**: Time to fully recharge stamina
- **Drain Rate**: Base stamina consumption while climbing
- **Danger/Enemy Drain**: Extra stamina loss from obstacles
- **Latch Drain**: Stamina cost while latched to walls

#### Health System
- **Max HP**: Maximum health points
- **Stamina Boost**: Temporary stamina increase from power-ups
- **Health Regen**: Gradual health restoration
- **Damage Cooldown**: Invulnerability period after taking damage

#### Size Variation
- **Surprise Feature!** Player size changes based on stamina level
- Higher stamina = slightly larger player
- Lower stamina = slightly smaller player
- Configurable width and height factors

#### Momentum System
- **Momentum Trail**: Visual trail effect while climbing
- **Build Rate**: How fast momentum accumulates
- **Max Bonus**: Maximum speed bonus from momentum
- **Decay Rate**: How fast momentum decreases when not climbing

### Visual Effects

#### Latch FX
- Spark particles on latching
- Dust clouds
- Configurable count and velocity

#### Jump FX
- Particle burst on jump
- Optional jump trail
- Customizable burst count

#### Land FX
- Dust particles on landing
- Screen shake effect
- Impact visualization

#### Damage FX
- Shockwave rings on damage
- Flash effects
- Symbol particles (!, X, *, #)
- Camera shake
- Damage vignette

#### Crumble FX
- **Surprise Feature!** Particles when platforms crumble
- Camera shake on collapse
- Warning shake before crumbling

#### Collect FX
- Sparkle particles on collection
- Glow effect
- Floating text
- Customizable colors

#### Stamina Warning FX
- Pulsing effect when stamina is low
- Screen vignette
- Health bar highlighting
- Configurable threshold

## Controls

- **Arrow Left/Right**: Move horizontally
- **Arrow Up**: Climb upward
- **Space**: Jump
- **Shift**: Latch/De-latch from walls
- **P**: Toggle configuration panel

## Configuration Panel

Press **P** to open the configuration panel with five tabs:

### Player Tab
- Movement settings (speed, climb speed, jump, gravity)
- Stamina configuration
- Health settings
- Size variation parameters
- Momentum system toggles

### Obstacles Tab
- Count and behavior for each obstacle type:
  - Enemy patrol settings
  - Danger hazard configuration
  - Friendly collectible properties
  - Blocking obstacle settings
  - Lighting parameters
  - Movable platform settings
  - Mystic phasing behavior

### Climb Structure Tab
- Procedural generation parameters
- Latching system configuration
- Crumbling platform settings
- Wall light effects
- Texture selection

### Atmosphere Tab
- Cloud settings (density, opacity, position, lightning)
- Rain effects (amount, speed effect, stamina effect)
- Color effects (hue, saturation, brightness)
- Altitude zone configuration

### FX Tab
- Enable/disable individual effects
- Configure particle counts
- Adjust visual intensities
- Screen shake settings
- Warning effect thresholds

## Export Configuration

Click the **Export JSON** button to download all current configurations as separate JSON files:
- `playerClimber.json`
- `obstacles.json`
- `climbStructure.json`
- `climbAtmosphere.json`
- `climbFX.json`

These files are automatically loaded on game startup if present in the same directory.

## Surprise Features

Throughout the codebase, several "surprise" features have been implemented as requested:

1. **Mystic Obstacles**: Phase in and out of existence, creating a timing challenge
2. **Crumbling Platforms**: Randomly generated platforms that collapse under the player
3. **Size Variation**: Player size dynamically changes based on stamina level
4. **Momentum Trail**: Ghost trail effect while climbing at high speed
5. **Lightning Flashes**: Random dramatic lighting effects in clouds
6. **Altitude Zones**: Gradual environmental changes as you climb higher
7. **Camera Shake**: Dynamic screen shake for impacts and damage

## Technical Details

- **Engine**: Three.js (WebGL)
- **Physics**: Custom 2D physics with gravity and collision
- **Rendering**: Hardware-accelerated 3D graphics
- **Configuration**: JSON-based with live editing
- **Procedural Generation**: Seed-based random generation for reproducible structures

## Color Scheme

Following the HTML/CSS color guide for accessibility:
- **Primary Colors**: Cool blues and greens (60%)
- **Secondary Colors**: Light neutrals and grays (30%)
- **Accent Colors**: Warm oranges for UI highlights (10%)
- **Backgrounds**: Dark cool tones for contrast
- **Text**: Light colors on dark backgrounds for readability

## Development Notes

This game was built using the **quasi-coder** skill to interpret shorthand notation and the **game-engine** skill for best practices in web-based game development. All configurations are exposed through JSON files for easy customization and iteration.

## Browser Support

- Modern browsers with WebGL support
- Recommended: Chrome, Firefox, Edge (latest versions)
- Mobile: Responsive design with touch controls (experimental)

## Performance Tips

- Reduce obstacle counts for better performance on slower devices
- Decrease particle counts in FX settings
- Disable rain effects if experiencing lag
- Lower cloud density for smoother rendering

## Credits

- Game Engine: Three.js
- Color Tools: Custom color wheel, swatches, and harmony tools
- Design Pattern: Based on 2D platformer architecture with vertical climbing mechanics
