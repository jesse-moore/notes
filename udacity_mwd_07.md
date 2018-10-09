# Udacity Mobile Web Development - Accessible & Responsive Web Apps

### Responsive Layout  
------------------------------------------------------------------------
- __Hardware Pixels:__ The amount of physical pixals on device  
- __Device-Independent Pixel (DIP):__ A unit of measurement to uniformly scale interfaces  
- __Device Pixel Ratio__ A ratio between Hardware pixels and DIP  
- __Viewport:__ defines the current visible area of a web page  
- __Setting the Viewport in HTML5:__
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- __Tap targets:__ Fingers are about 40 css pixels wide, so make the targets 48 pixels wide and - tall. Some tap targets can be smaller but use 40 pixels between them.  
- __Media Queries:__  
- __Flexbox:__  
- __Breakpoints:__  

### Responsive and Optimized Images  
------------------------------------------------------------------------
#### General Info
- __calc():__ CSS function letting you perform calculatations when specifing CSS property values - [MDN - calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)  
- __Raster and Vector Graphics:__ SVG, PNG and JPG; Image Compression  
- __Measuring Page Speed:__  
	- [Grunt PageSpeed plugin](https://www.npmjs.com/package/grunt-pagespeed)  
	- [PageSpeed Node module](https://github.com/addyosmani/psi/)  

#### Image Attributes  
- __srcset:__ defines the set of images we will allow the browser to choose between, and what size each image is  
	- __syntax:__ filename followed by a width descriptor: 380w or a pixel density descriptor: 1x, 1.5x, 2x, ect...  
- __sizes:__ defines a set of media conditions (e.g. screen widths) and indicates what image size would be best to choose  
	- __syntax:__ media condition (max-width:480px) and the width of
the slot the image will fill when media condition is true 440px, a last width value is a default value when all other media conditions are false, some relative width units include:  
		- vw - Relative to 1% of the width of the viewport*	
		- vh - Relative to 1% of the height of the viewport*	
		- vmin - Relative to 1% of viewport's* smaller dimension	
		- vmax - Relative to 1% of viewport's* larger dimension	
		- % - Relative to the parent element  	
- __src:__ The last src attribute acts as a fallback if scrset and sizes are not supported
- __EXAMPLE:__
```html
<img srcset="image-500w.ext 500w,
             image-1x.ext 1x,
     sizes="(max-width: 500px) 450px,
            (min-width: 501px) 600px,
            800px"
     src="image.ext" alt="Image Description">
```
+ __Picture element:__ gives more flexibility in specifying image resources. It holds two different tags `<source>` and `<img>` 
	- `<source>` has the following attributes:
		- srcset (required) - defines the URL of the image to show
		- media - accepts any valid media query that would normally be defined in a CSS
		- sizes - defines a single width descriptor, a single media query with width descriptor, or a comma-delimited list of media queries with a width descriptor
		- type - defines the MIME type  
	- `<img>` 
		- required as the last child tag of the `<picture>` declaration block.
		- used to provide backward compatibility for browsers that do not support the `<picture>` element, or if none of the `<source>` tags matched.
- __EXAMPLE:__
```html
<picture>
  <source media="(min-width: 650px)" srcset="img_pink_flowers.jpg">
  <source media="(min-width: 465px)" srcset="img_white_flower.jpg">
  <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
</picture>
```
- __Additional Resources:__  
	- [Srcset and sizes](http://ericportis.com/posts/2014/srcset-sizes/)
	- [Picturefill polyfill](http://udacity.github.io/responsive-images/examples/3-08/picturefill)

### Accessibility
------------------------------------------------------------------------
- __Images:__
	- Use of `<alt>` attributes
- __Focus:__ navigating the web page by keyboard only
	- Methods:
		- `tab` moves focus foward
		- `shift + tab` moves focus backward
		- `arrow keys` navigates inside of a component
	- Considering DOM Element ordering
	- `tabindex`
		- Set `tabindex="0"` to make elements that do not receive focus focusable
		- Set `tabindex="-1"` to make elements that normally receive focus unfocusable
		- `tabindex` can also be used to modify the order elements receive focus, but it is best pratice to order the elements correctly in the DOM
		- [W3 - tabindex](https://www.w3.org/TR/html5/editing.html#the-tabindex-attribute)
	- Skip Links
		- [Web AIM Reference](http://webaim.org/techniques/skipnav/)
		- [Focus Management](https://developers.google.com/web/updates/2016/03/focus-start-point?hl=en)
	- To find what element is currently focused
		- `document.activeElement`
- __Semantics:__
	- __Role, Name, Value:__ Name and role can be programmatically determined, and value can be programmatically set and notification of changes to these items is available to user agents
	- __Accessibility Tree__
	- `<label>` __tag:__ Provide text alternative for any non-text content
		- [W3C Reference](https://www.w3.org/TR/html5/sec-forms.html#the-label-element)
		- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- __ARIA:__
	- Accessible Rich Internet Applications
	- Fixing check boxes example
    
		```js
		//In a funtion intializing the checkboxes
	    this.el.setAttribute('role', 'checkbox'); //Sets attribute role to checkbox
	    if (this.el.hasAttribute('checked')) { // checks if element has a checked attribute
	      this.el.setAttribute('aria-checked', 'true'); //Sets aria-checked attribute to true
	    } else {
	      this.el.setAttribute('aria-checked', 'false'); //Sets aria-checked attribute to false
	    }
	    
	    //In a function which fires when a checkbox is interacted with
	    if (this.el.hasAttribute('checked')) {
	      this.el.removeAttribute('checked');
	      // Keep checked attribute and aria-checked in sync.
	      this.el.setAttribute('aria-checked', 'false');
	    } else {
	      this.el.setAttribute('checked', '');
	      // Keep checked attribute and aria-checked in sync.
	      this.el.setAttribute('aria-checked', 'true');
	    }
		```

	- ARIA Roles
		- [W3C - Roles](https://www.w3.org/TR/wai-aria-1.1/#roles)
	- Roles Example:

		```js
		//In a function initializing the radiogroup
		// Set ARIA role for the radio group.
    	this.el.setAttribute('role', 'radiogroup');

    	//Function fires when checkbox is interacted with
    	RadioGroup.prototype.changeFocus = function() {
		    // Set the old button to tabindex -1
		    this.focusedButton.tabIndex = -1;
		    this.focusedButton.removeAttribute('checked');
		    this.focusedButton.setAttribute('aria-checked', 'false'); //Setting aria-checked attribute

		    // Set the new button to tabindex 0 and focus it
		    this.focusedButton = this.buttons[this.focusedIdx];
		    this.focusedButton.tabIndex = 0;
		    this.focusedButton.focus();
		    this.focusedButton.setAttribute('checked', '');
		    this.focusedButton.setAttribute('aria-checked', 'true'); //Setting aria-checked attribute
		};
    	```

    - [ARIA 1.1 relationship attributes:](https://www.w3.org/TR/wai-aria-1.1/#attrs_relationships)
    - Fixing combo box

	    ```js
	    this.textbox.setActiveDescendant(newActive); //Keeps focus in menu

		if (foundItems === 0) {
			this.hide();
		} else {
			for (var i = 0; i < this.visibleItems.length; i++) {
		    	var item = this.visibleItems[i];
		    	item.setAttribute('aria-posinset', i + 1);
		    	item.setAttribute('aria-setsize', this.visibleItems.length);
			}
	    }        
	    ```
	- aria-live
	- Fix Sign Up Dialog
		- Add aria role attribute "dialog"
			- `<div class="modal" role="dialog" aria-labelledby="login">`
		- Hide non-modal content from screen readers
			- `document.querySelector('.wrapper').setAttribute('aria-hidden', true);`
			- `document.querySelector('.wrapper').removeAttribute('aria-hidden');`
- __Styles__
	- focus pseudo-class
	- Styling with aria
	- https://developers.google.com/web/fundamentals/accessibility/accessible-styles#color_and_contrast

	```html
	<!-- HTML -->
	<div id="content" class="disclosure-content" aria-hidden="true">
	```

	```css
	/* CSS */
	.disclosure-content[aria-hidden="true"] {}
	.disclosure-content[aria-hidden="false"] {}
	```

- __Additional Resources:__  
	- Plain text web browser [Lynx](http://invisible-island.net/lynx/)
	- Voice-over chrome extension[ChromeVox](http://www.chromevox.com/)
	- [Web Content Accessibility Guidelines 2.0 (WCAG)](https://www.w3.org/TR/WCAG20/)
	- [Web Aim Checklist for WCAG 2.0](http://webaim.org/standards/wcag/checklist)
	- [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/)

## Udacity Mobile Web Development Lesson 7 Notes
------------------------------------------------------------------------
### Setting up Build Process

#### Installing imagemagick  
imagemagick package URL for reference: http://www.imagemagick.org/script/index.php  
gm package URL for reference: https://www.npmjs.com/package/gm  

_imagemagick doesn't have an officlal nodejs package so I installed imagemagick for ubuntu and then
graphicsmagick for nodejs which is a nodejs wrapper for imagemagick_

- Check if imagemagick is installed:   
`dpkg -l imagemagick`
- Install imagemagick for ubuntu if not installed:  
`sudo apt-get install imagemagick`
- Check if graphicsmagick _(gm)_ is installed:  
`npm list --depth 0 -g gm`
- Install gm if not installed:  
`npm install gm`

#### Grunt
Grunt references: https://gruntjs.com/getting-started  
- Install grunt:  
_(This will put the grunt command in your system path, allowing it to be run from any directory.)_  
`npm install -g grunt-cli`
- Change to the project's directory and install dependencies:  
_(Dependencies should be listed in the package.json file)_  
`npm install`
- Edit and then run Grunt file:  
`grunt`
 


### Running the Project Part 1 site
Start web server from site directory:  
`python -m SimpleHTTPServer 8080`

Additional Resources:  
Responsive image loading developed for BBC News: [Imager.js](https://github.com/BBC-News/Imager.js/)




