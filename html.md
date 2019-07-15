# HTML

### Definitions

- __`data-` attribute:__ used to store extra data in the DOM
- __XHTML:__ HTML written as XML and is stricter than HTML
- __Hardware Pixels:__ The amount of physical pixels on device  
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

### DOCTYPE

- Document Type - Tells the user agents what version of the HTML specifications your document is using and determines what layout mode to use. If the DOCTYPE is recognized "standards mode" or "no-quirks mode" is used if the DOCTYPE is not recognized "quirks mode" is used.
- Placed on the first line of html file
- HTML 4.01 the DOCTYPE refers to a DTD (Document Type Definition) as HTML 4.01 is based on SGML (Standard Generalized Markup Language)
- HTML 4.01 Example:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

- HTML 5 is not based on SGML and does not require a reference to a DTD
- HTML 5 Example: `<!DOCTYPE html>`

### Multilingual Sites

- Client language preferences are sent by the user agent in the `Accept-Language` header.
- The returned document should declare the lang attribute in the `<html>` tag e.g. `<html lang="en">...</html>`
- Should allow users to choose preferred language if available
- Be mindful of different formats in each locale such as dates, word order, and sentence or word length.

### cookie, sessionStorage, and localStorage

|                                        | `cookie`                                                 | `localStorage` | `sessionStorage` |
| -------------------------------------- | -------------------------------------------------------- | -------------- | ---------------- |
| Initiator                              | Client or server. Server can use `Set-Cookie` header     | Client         | Client           |
| Expiry                                 | Manually set                                             | Forever        | On tab close     |
| Persistent across browser sessions     | Depends on whether expiration is set                     | Yes            | No               |
| Sent to server with every HTTP request | Cookies are automatically being sent via `Cookie` header | No             | No               |
| Capacity (per domain)                  | 4kb                                                      | 5MB            | 5MB              |
| Accessibility                          | Any window                                               | Any window     | Same tab         |
### ```<script>```, ```<script async>```, and ```<script defer>```
* ```<script>``` - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
* ```<script async>``` - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). Use async when the script is independent of any other scripts on the page, for example, analytics.
* ```<script defer>``` - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. If there are multiple of them, each deferred script is executed in the order they were encoun­tered in the document. If a script relies on a fully-parsed DOM, the defer attribute will be useful in ensuring that the HTML is fully parsed before executing. There's not much difference in putting a normal ```<script>``` at the end of ```<body>```. A deferred script must not contain document.write.
* The async and defer attrib­utes are ignored for scripts that have no src attribute.
### External CSS ```<link>``` and JS ```<script>``` tags placement
* CSS ```<link>``` should be placed in the head tag of the document. When the HTML document first loads, HTML and CSS are being parsed simultaneously, if the CSS ```<link>``` tag is near the bottom of the document it prohibits progressive rendering in some browsers which results in a temporary blank page or a flash of unstyled content (FOUC).
* JS ```<script>``` should be place at the bottom of the document unless using ```<script defer>```. ```<script>``` tags block HTML parsing while loading and will slow down the initial page load. Placing ```<script>``` tags at the end will also prevent errors if the JS manipulates the document as all the elements being manipulated will be present. 
### Progressive Rendering
* Techniques used to improve webpage performance.
* Examples: Lazy image loading, Above the fold rendering, Async HTML fragments
* Async HTML Fragments - https://www.ebayinc.com/stories/blogs/tech/async-fragments-rediscovering-progressive-html-rendering-with-marko/

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
- __sizes:__ defines a set of media conditions (e.g. screen widths) and indicates what image size would be best to choose _(not required if using pixel density descriptor in srcset attribute)_ 
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
<img srcset="elva-fairy-500w.jpg 500w,
             elva-fairy-1000w.jpg 1000w,
             elva-fairy-2000w.jpg 2000w"
     sizes="(max-width: 600px) 500px,
            (max-width: 1200px) 1000px,
            2000px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```
- For a device width of 320px, the following calculations are made:
	- 500 / 320 = 1.5625
	- 1000 / 320 = 3.125
	- 2000 / 320 = 6.25
- If the client's resolution is 1x, 1.5625 is the closest, and 500w corresponding to small.jpg will be selected by the browser.
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
		- `tab` moves focus forward
		- `shift + tab` moves focus backward
		- `arrow keys` navigates inside of a component
	- Considering DOM Element ordering
	- `tabindex`
		- Set `tabindex="0"` to make elements that do not receive focus focusable
		- Set `tabindex="-1"` to make elements that normally receive focus unfocusable
		- `tabindex` can also be used to modify the order elements receive focus, but it is best practice to order the elements correctly in the DOM
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