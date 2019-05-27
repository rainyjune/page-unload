
window.onbeforeunload = function () {
  setLocalData("\nonbeforeunload " + document.title);
};

window.onunload = function () {
  setLocalData("\nonunload " + document.title);
};

window.onload = function() {
  setInterval(showLog, 1000);

  id('clearbtn').onclick = function() {
    localStorage.removeItem('event');
    showLog();
  }
};

function id(str) {
  return document.getElementById(str);
}

if (window.localStorage) {
  console.log('localStorage supported');
} else {
  alert("Local storage is not supported");
}


function setLocalData(msg) {
  var old = localStorage.getItem('event') || '';
  localStorage.setItem('event',  old + msg);
}

function getLocalData() {
  return localStorage.getItem('event');
}

function showLog() {
  id('log').value = getLocalData() || '[empty]';
}