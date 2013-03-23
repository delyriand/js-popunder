function jsPopunder(sUrl, sConfig) {

    var _parent = (top != self && typeof(top.document.location.toString())==='string') ? top : self;
    var popunder = null;

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


    function doPopunder(sUrl, sName, sWidth, sHeight, sPosX, sPosY) {
        if (isCapped()) return;

        var sOptions = 'toolbar=no,scrollbars=yes,location=yes,statusbar=yes,menubar=no,resizable=1,width='+sWidth.toString()+',height='+sHeight.toString()+',screenX='+sPosX+',screenY='+sPosY;

        document.onclick = function() {
            if (isCapped()) return;
            popunder = _parent.window.open(sUrl, sName, sOptions);
            if (popunder) {
                // cookie
                var now = new Date();
                document.cookie = cookie+'=1;expires='+ new Date(now.setTime(now.getTime()+sWait)).toGMTString() +';path=/';
                now = new Date();
                document.cookie = cookie+'Cap='+(popsToday+1)+';expires='+ new Date(now.setTime(now.getTime()+(84600*1000))).toGMTString() +';path=/';

                pop2under();
            }
        };
    }


    function pop2under() {
        try {
            popunder.blur();
            popunder.opener.window.focus();
            window.self.window.blur();
            window.focus();

            if (browser.firefox) openCloseWindow();
            if (browser.webkit) openCloseTab();
        } catch (e) {}
    }

    function openCloseWindow() {
        var ghost = window.open('about:blank');
        ghost.focus();
        ghost.close();
    }

    function openCloseTab() {
        var ghost    = document.createElement("a");
        ghost.href   = "about:blank";
        ghost.target = "PopHelper";
        document.getElementsByTagName("body")[0].appendChild(ghost);
        ghost.parentNode.removeChild(ghost);

        var clk = document.createEvent("MouseEvents");
        clk.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
        ghost.dispatchEvent(clk);

        // open a new tab for the link to target
        window.open("about:blank", "PopHelper").close();
    }


    // abort?
    if (isCapped()) {
        return;
    } else {
        doPopunder(sUrl, sName, sWidth, sHeight, sPosX, sPosY);
    }
}