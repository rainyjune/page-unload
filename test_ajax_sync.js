/**
 * Send data via ajax before page closing
 */
var storage = (function() {
  if (window.localStorage) {
    //alert('localStorage supported');
  } else if (Cookies){
    //alert("Local storage is not supported, using Cookies");
  } else {
    alert('exception');
  }

  var key = 'event';
  return {
    setLocalData: function(msg) {
      var oldVal = '';
      if (window.localStorage) {
        oldVal = localStorage.getItem(key) || '';
        localStorage.setItem(key,  oldVal + msg);
      } else if (Cookies) {
        oldVal = Cookies.get(key) || '';
        Cookies.set(key, oldVal + msg, { expires: Infinity });
      }
    },
    getLocalData: function() {
      if (window.localStorage) {
        return localStorage.getItem(key) || '';
      } else if (Cookies) {
        return Cookies.get(key) || '';
      }
    },
    removeLocalData: function() {
      if (window.localStorage) {
        localStorage.removeItem(key);
      } else if (Cookies) {
        Cookies.expire(key);
      }
    }
  }
})();

var logarea = id('log');

var loadHandler = function(e) {
  e = e || window.event;
  storage.setLocalData("\n " + e.type + " " + document.title + ' on ' + (new Date()).toString());

  showLog();
  setInterval(showLog, 1000);

  id('clearbtn').onclick = function() {
    storage.removeLocalData();
    showLog();
  };
  id('testajax').onclick = function() {
    ajax('testajax-sync');
  }
};

var unloadHandler = function (e) {
  e = e || window.event;
  var orders = ['beforeunload', 'pagehide', 'unload'];
  var type = e.type;
  var index = indexOf(orders, type);
  var msg = "\n #[" + (index + 1) + "] " + type + " " + document.title + ' on ' + (new Date()).toString();
  storage.setLocalData(msg);
  ajax(msg);
};

if ('onpageshow' in window) {
  addEvent(window, 'pageshow', loadHandler);
  addEvent(window, 'pagehide', unloadHandler);
} else {
  addEvent(window, 'load', loadHandler);
  addEvent(window, 'unload', unloadHandler);
}

function addEvent(target, type, listener) {
  if (window.addEventListener) {
    target.addEventListener(type, listener, false);
  } else {
    target.attachEvent('on' + type, listener);
  }
}

function id(str) {
  return document.getElementById(str);
}

function showLog() {
  logarea.value = storage.getLocalData() || '[empty]';
  if (logarea.scrollTo) {
    logarea.scrollTo({
      top: logarea.scrollHeight
    });
  }
}

function indexOf(arr, searchElement) {
  if (Array.prototype.indexOf) {
    return arr.indexOf(searchElement);
  }
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

function ajax(msg) {
  var request = new XMLHttpRequest();
  request.open('GET', './server/ajax.php?q=' + window.encodeURIComponent(msg), false);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      //var data = JSON.parse(request.responseText);
      storage.setLocalData("Ajax ok"+ ' on ' + (new Date()).toString());
    } else {
      // We reached our target server, but it returned an error
      storage.setLocalData("Ajax failed"+ ' on ' + (new Date()).toString());
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    storage.setLocalData("Ajax error"+ ' on ' + (new Date()).toString());
  };

  request.send();
}