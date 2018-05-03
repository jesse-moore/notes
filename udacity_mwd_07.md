# Udacity Mobile Web Development - Accessible & Responsive Web Apps #
------------------------------------------------------------------------
__Viewport__ defines the current visible area of a web page

__Setting the Viewport in HTML5__
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Udacity Mobile Web Development Lesson 7 Notes
------------------------------------------------------------------------
### Setting up Build Process

#### Installing imagemagick
imagemagick package URL for reference: http://www.imagemagick.org/script/index.php
gm package URL for reference: https://www.npmjs.com/package/gm

_imagemagick doesn't have an officlal nodejs package so I installed imagemagick for ubuntu and then
graphicsmagick for nodejs which is a nodejs wrapper for imagemagick_ 

Check if imagemagick is installed
`dpkg -l imagemagick`

Install imagemagick for ubuntu if not installed
`sudo apt-get install imagemagick`

Check if graphicsmagick _(gm)_ is installed
`npm list --depth 0 -g gm`

Install gm if not installed
`npm install gm`

#### Grunt
Grunt references: https://gruntjs.com/getting-started 
Install grunt
_This will put the grunt command in your system path, allowing it to be run from any directory._
`npm install -g grunt-cli`

Working with Grunt
_Dependencies should be listed in the package.json file__
_Change to the project's directory and install dependencies_
`npm install`
_Edit and then run Grunt file_
`grunt`
 
Additional Resources
Responsive image loading developed for BBC News:[Imager.js](https://github.com/BBC-News/Imager.js/)

### Running the Project Part 1 site
Start web server from site directory
`python -m SimpleHTTPServer 8080`

## Udacity Mobile Web Development Lesson 8 Notes
------------------------------------------------------------------------

## Udacity Mobile Web Development Lesson 9 Notes
------------------------------------------------------------------------
srcset
sizes


