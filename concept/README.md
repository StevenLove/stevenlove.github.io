Concept
=======
The intent of this project is to replicate the board game Concept in a single page web app.
If you aren't familiar with the game, you can check out the rules and the game board at the following links.
+ [Rules](https://images-cdn.asmodee.us/filer_public/cb/5b/cb5b7be5-a77c-45bd-8d61-ba0b6220db4e/conc01_rules.pdf)
+ [Board](http://rprod.com/uploads/CONCEPT_PLAYERHELP_EN.pdf)

Milestones
==========
+ Set up basic infrastructure
- [x] React Basics (Using create-react-app)
- [x] git
- [x] npm

+ Determine a design for the page
- [x] Panel to show all icons
- [x] Panel to show just the selected icons
- [x] Way to pick which subconcept you're describing
- [x] Way to show just one person the card with phrases

+ Implement the behavior
- [x] Clicking on a concept places a marker on it
- ?

Development
===========

Getting Started
---------------
0. Have git and npm
1. Clone this repo with git
```console
git clone git@github.com:StevenLove/concept.git
```
2. Go into the repo
```console
cd concept
```
3. Install dependencies
```console
npm install
```

Testing/Development
-------
```console 
npm start
```
This will open a browser tab to localhost:3000, where you can see the project.
Live reloading is enabled, so when you make a change to the code and save the file, the page should automatically refresh with your changes in effect.

Building
--------

```console
npm run deploy
```