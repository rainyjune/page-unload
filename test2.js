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

/*
// #1 beforeunload
window.onbeforeunload = function () {
  storage.setLocalData("\n #1 onbeforeunload " + document.title + ' on ' + (new Date()).toString());
};

// # 2 pagehide
window.onpagehide = function () {
  storage.setLocalData("\n #2 onpagehide " + document.title + ' on ' + (new Date()).toString());
};

// # 3 unload
window.onunload = function () {
  storage.setLocalData("\n #3 onunload " + document.title + ' on ' + (new Date()).toString());
};
*/

var loadHandler = function(e) {
  e = e || window.event;
  storage.setLocalData("\n " + e.type + " " + document.title + ' on ' + (new Date()).toString());

  showLog();
  setInterval(showLog, 1000);

  id('clearbtn').onclick = function() {
    storage.removeLocalData();
    showLog();
  };
};

var unloadHandler = function (e) {
  e = e || window.event;
  var orders = ['beforeunload', 'pagehide', 'unload'];
  var type = e.type;
  var index = indexOf(orders, type);
  storage.setLocalData("\n #[" + (index + 1) + "] " + type + " " + document.title + ' on ' + (new Date()).toString());
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