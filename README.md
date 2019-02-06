# Neon city

## Overview

I wanted to make something that challenges me, but also achievable within the time allowed. I had the idea of a 3D game but I wanted to make sure it wasn't too ambitious. To test this, I made a quick demo that rendered and moved some 3D objects on screen with the ability to move the camera around with the arrow keys. Achieving this made me feel comfortable moving forward.

The game is a simple 3D FPS shooter type game where the near-term goal is a timed target practice mini-game. You only have a certain amount of time to hit the next target, if you do not hit it before the timer runs out, the game ends. The targets will be placed further and further away from you so you must keep moving.

A longer term goal is to spawn enemies in waves that rush towards you and increase in difficulty over time. The objective is to not get touched by the enemies.

For the aesthetics, I'm going for something minimal, dark backround, a city setting, and primitive shapes with neon outlines so that I don't have to worry about creating/finding 3d models and materials. 

## Functionality

- Users can use the WASD keys to move forwards/backwards/left/right
- Users can use a mouse/trackpad to look around
- User can click the mouse or trackpad to shoot their gun
- Targets will be spawned one at a time in different positions
- User will only have a certain amount of time to hit the target
- The game ends if the player doesn't hit the next target before the time runs out
- Personal high score will be saved in localstorage

## Architecture and Technologies

- Vanilla JavaScript for game logic
- HTML5 Canvas for rendering
- three.js for help rendering in 3D space
- Webpack to bundle various scripts into a single source

## Implementation Timeline

### Day 1:

- Setup the filestructure and webpack
- Create the player controller and get it moving with keyboard and mouse
- Implement gun shooting functionality

### Day 2:

- Create the target objects
- Implement a target spawner
- Implement the game logic including the target timer and gameover

### Day 3: 

- Create a city backdrop
- Implement the HUD to start/restart, mute, highscore, etc.
- Add personal links