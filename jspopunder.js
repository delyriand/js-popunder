function jsPopunder(sUrl, sConfig) {

    sConfig = (sConfig || {});

    var sName   = (sConfig.name   || Math.floor((Math.random()*1000)+1));
    var sWidth  = (sConfig.width  || window.innerWidth);
    var sHeight = (sConfig.height || window.innerHeight);

    var sPosX = (typeof(sConfig.left)!= 'undefined') ? sConfig.left.toString() : window.screenX;
    var sPosY = (typeof(sConfig.top) != 'undefined') ? sConfig.top.toString()  : window.screenY;

    /* capping */
    var sWait = (sConfig.wait || 3600); sWait = (sWait*1000);
    var sCap  = (sConfig.cap  || 2);

    /* cookie stuff */
    var popsToday = 0;
    var cookie = (sConfig.cookie || '__.popunder');

    var browser = function() {
        var n = navigator.userAgent.toLowerCase();
        var b = {
            webkit: /webkit/.test(n),
            mozilla: (/mozilla/.test(n)) && (!/(compatible|webkit)/.test(n)),
            chrome: /chrome/.test(n),
            msie: (/msie/.test(n)) && (!/opera/.test(n)),
            firefox: /firefox/.test(n),
            safari: (/safari/.test(n) && !(/chrome/.test(n))),
            opera: /opera/.test(n)
        };
        b.version = (b.safari) ? (n.match(/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (n.match(/.+(?:ox|me|ra|ie)[\/: ]([\d.]+)/) || [])[1];
        return b;
    }();


    function isCapped() {
        try {
            popsToday = Math.floor(document.cookie.split(cookie+'Cap=')[1].split(';')[0]);
        } catch(err){}
        return (sCap<=popsToday || document.cookie.indexOf(cookie+'=') !== -1);
    }


    function openIt(sUrl, sName, sOptions) {
        if (isCapped()) return;

        var _parent = (top != self && typeof(top.document.location.toString())==='string') ? top : self;
        var popunder = _parent.window.open(sUrl, sName, sOptions);

        if (popunder) {
            popunder.blur();

            var now = new Date();
            document.cookie = cookie+'=1;expires='+ new Date(now.setTime(now.getTime()+sWait)).toGMTString() +';path=/';
            now = new Date();
            document.cookie = cookie+'Cap='+(popsToday+1)+';expires='+ new Date(now.setTime(now.getTime()+(84600*1000))).toGMTString() +';path=/';

            window.focus();
            try{ opener.window.focus(); }catch(err){}
        }
        return popunder;
    }


    function popunder(sUrl, sName, sWidth, sHeight, sPosX, sPosY) {
        if (isCapped()) return;

        var sOptions = 'toolbar=no,scrollbars=yes,location=yes,statusbar=yes,menubar=no,resizable=1,width='+sWidth.toString()+',height='+sHeight.toString()+',screenX='+sPosX+',screenY='+sPosY;

        if (browser.webkit) {

            document.onmousedown = function () {
                openIt(sUrl, sName, sOptions);
            };
            document.onclick = function() {
                window.open("about:blank").close();
            };

        } else {
            document.onclick = function() {
                var popunder = openIt(sUrl, sName, sOptions);
                if (popunder) {

                    if (!browser.msie) {
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

                }
            };
        }
    }

    // abort?
    if (isCapped()) {
        return;
    } else {
        popunder(sUrl, sName, sWidth, sHeight, sPosX, sPosY);
    }
}