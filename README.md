# FEND Project 7 (Maps)

## Overview
This is and end-to-end walkthrough of building Project 7 (Maps) in Udacity's Front End Nano-Degree program. This project uses React along with some APIs and other external dependencies. Namely:

* Google Maps
* FourSquare
* Font Awesome
* React Material-UI for the Drawer
* google-maps-react for primary map display

## Features
A list of Mexican restaurants in the Katy, TX area has been created. These locations display as markers on the map. Clicking a marker displays an info box containing the name of the restaurant, a link to its web site (if avaialble), and a picture from FourSquare related to the restaurant (if available). Clicking the hamburger button on the left of the screen opens a drawer with a list of the venues and a text box at the top. Typing into the box filter the list of restaurants accordingly. Clicking a restaurant in the list closes the drawer and activates the marker on the map as if it had been clicked. Clicking anywhere outside the drawer closes the drawer. Clicking anywhere on the map closes any active info display.

## Setup
* Clone this repo from https://github.com/thefinitemonkey/fend-project-7-map
* Run `npm install`
* Run `npm start`

Note that the default service worker is used in this app (bootstrapped with create-react-app) and so only works in production build.
