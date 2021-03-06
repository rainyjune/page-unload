var title = 'index.html';
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
        Cookies.set(key, oldVal + msg);
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

window.onbeforeunload = function () {
  storage.setLocalData("\nonbeforeunload index1111.html");
};

window.onunload = function () {
  storage.setLocalData("\nonunload  index1111.html");
};

var isIOS = !!navigator.platform.match(/iPhone|iPod|iPad/);

if (isIOS) {
  alert('is iOS!');
  window.onpagehide = function () {
    storage.setLocalData("\nonpagehide  index1111.html");
  };
} else {
  window.onpagehide = function () {
    storage.setLocalData("\nonpagehide  index1111.html (not iOS)");
  };
}

window.onload = function() {
  storage.setLocalData("\nonload  index1111.html");

  setInterval(showLog, 1000);

  id('clearbtn').onclick = function() {
    storage.removeLocalData();
    showLog();
  }
};

function id(str) {
  return document.getElementById(str);
}

function showLog() {
  id('log').value = storage.getLocalData() || '[empty]';
}