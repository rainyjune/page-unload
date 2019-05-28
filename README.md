# page-unload

测试浏览器页面关闭/离开时的事件触发情况。

| 场景 | MacOS Chrome | MacOS Safari | iPad Safari iOS 12.1.3 | Android 9 Chrome | Android 8 QQ X5 内核 | IE 6 |
| ---- | ------------| --------------|------------------------|-----------------|----------------------|------|
|链接跳转|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onbeforeunload<br>2.onpagehide|1.onpagehide|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onpagehide|1.onbeforeunload<br>2.onunload|
|页面刷新|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onpagehide<br>2.onunload|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onbeforeunload<br>2.onunload|
|前进/后退按钮|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onbeforeunload<br>2.onpagehide|1.onpagehide|1.onbeforeunload<br>2.onpagehide<br>3.onunload|1.onpagehide|1.onbeforeunload<br>2.onunload|

 * QQ X5 通过链接跳转时，在新页面会错误执行新页面的 onpagehide 和 onunload 事件，因此这两个事件不可靠。不过会正确执行之前页面的onpagehide事件。
 * QQ X5 前进/后退按钮不会执行 onbeforeunload 和 on unload 事件
 * IE 6-10 不支持 pagehide 事件。https://caniuse.com/#feat=page-transition-events
 * The load and unload events on iOS may not work as expected for back and forward optimization. Use pageshow and pagehide events instead. https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW5
