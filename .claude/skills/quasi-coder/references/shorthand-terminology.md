# Shorthand Terminology

Terminology as used by the collaborator.

- **Game** - the entirety of rendered elements, mapped actions and events, and other related data like configured JSON imports/exports/links used for elements and imported/exported/linked assets
- **Gamer** - the user or gamer who is currently playing the game or controlling the player, or another element of the game
- **Element** - anything rendered in the game view
- **Playable** - elements that are directly affected by a keypress, mouse or event, and are controlled in gameplay
- **Player** - the current game element whose state is directly affected by keypress and mouse events; and is able to change the state of other elements
- **Interactable** - elemnts that are affected by a playable element e.g. a box that breaks on an playable element action
- **Action** - a movement of an element that changes it state
- **State** - the current properties an element is in
- **Stage** - The entire scope of non-playable elements that are rendered, or are to be rendered in the current game
- **Level** - the current stage layer
- **Layer** - A state of a non-playable element
- **Movement** - A simple change in the state of a playable and non-playable, or rendering element
- **Camera** - the determining factor for the current rendered frame in the Window
- **Resize** - scaling the size of a playable and non-playable element which will make it smaller or larger
- **Zoom** - a camera action that changes the state of an element, resizing it
- **2d** - 2d environment or gameplay
- **3d** - 3d environment or gameplay
- **Obstacle** - a element with mapped geometry, the will:
  - limit a player's state in regards to player movements using collision detection
  - reduce a player's health if it produces a destructive action on the player
  - have it's health reduced if a player performs a dectructive action on it
  - prevent or lock a player's state pending on the current conditions
  - limit another obstacles state in regards to the sibling obstacles movements using collision dection
- **Collision detection** - geometry based algorithms that detect overlapping elements or elements whose state has collided with the state of another element as defined by geometry and physics rules of the stage
