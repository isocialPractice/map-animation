```
agent: 'agent'
description: 'As need prompt for quasi-coder skill.'
---

quasi-coder --update-todo-at #selection --import-collaborator `game-engine` --add-type:2d "12 new map animation ideas" --add-type:3d "10 new map animation ideas" --add-new-section "## New Map Types" --new-type:board <2d> extends:2d --add-type:2d<board> "4 new ideas" under-level-three-header --new-type:card <2d> extends:2d --add-type:2d<card> "5 new ideas" under-level-three-header --new-type:player <3d> extends:3d --add-type:3d<player> "3 new ideas" under-level-three-header --new-type:data --new-type-mapped-types [<inventory>, <decision>, <use-item>, <dialouge>, <pause-screen>, <hint>, <highlight-object-is-interactible>, <earn-trophy>, <game-credits>, <open-screen>, <open-screen:open-menu>, <settings>, <opening-credits>, <tutorial>] --add-type:data<for-each-mapped-type> "add ${Math.floor(Math.random() * 5)} new ideas" under-level-three-header --idea-referncing work-with-collaborator `game-engine` --work-type brainstorm --post-work generate-new-ideas
