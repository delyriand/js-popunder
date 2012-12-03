function jsPopunder(sUrl, sName, sWidth, sHeight) {
    if (typeof(sName)===null || sName === '') sName = Math.floor((Math.random()*1000)+1);

    sWidth = (sWidth || screen.width);
    sHeight = (sHeight || screen.height); sHeight = sHeight-122;

    var sOptions = 'toolbar=no,scrollbars=yes,location=yes,statusbar=yes,menubar=no,resizable=1,width='+sWidth.toString()+',height='+sHeight.toString()+',screenX=0,screenY=0,left=0,top=0';

    // create pop-up from parent context
    var _parent = (top != self && typeof(top.document.location.toString())==='string') ? top : self;
    var popunder = _parent.window.open(sUrl, sName, sOptions);
    if (popunder) {
        popunder.blur();
        if (navigator.userAgent.indexOf('MSIE') === -1) {
            popunder.params = { url: sUrl };            
            (function(e) {
                with (e) {
                    if (typeof window.mozPaintCount != 'undefined' || typeof navigator.webkitGetUserMedia === "function") {
                        try {
                            var poltergeist = document.createElement('a');
                            poltergeist.href = "javascript:window.open('about:blank').close();document.body.removeChild(poltergeist)";
                            document.body.appendChild(poltergeist).click();
                        }catch(err){}
                    }
                }
            })(popunder);
        }
        window.focus();
        try{ opener.window.focus(); }catch(err){}
    }
}