# js-popunder

**js-popunder** is a pure javascript function that creates pop-under windows

It uses some of the code from the **[jquery-popunder](https://github.com/hpbuniat/jquery-popunder)** plugin by [@hpbuniat](https://github.com/hpbuniat)

Usage
-----
Popunders are popup windows that open behind the currently active browser window.
You can open popunders on any user-generated event (including document.onclick).

Options
-------
- "sUrl": The url to open
- "sName": The name of the popunder window (optional)
- "sWidth": The width of the popunder (optional)
- "sHeight": The height of the popunder (optional)

Compatibility
-------
- Mozilla Firefox 3-17
- Google Chrome 10-23
- Microsoft Internet Explorer 6-9
- Apple Safari 5

Example
-------
	// opens google.com in full screen
	document.onclick = function() {
        jsPopunder('http://www.google.com');
	};

	// opens google.com in a 500x500 window only once
	var opened = false;
	document.onclick = function() {
	    if (!opened) {
	        jsPopunder('http://www.google.com', 'googlewindow', 500, 500);
	        opened = true;
	    }
	};

Of course, you can (and probably should) add cookies to the mix to have more control over when and how many popunders to open.