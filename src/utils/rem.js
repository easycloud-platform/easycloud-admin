/*
 * @module: 适配屏幕 / 100px = 1rem
 */
(function (doc, win) {
  let docEl = doc.documentElement
  docEl.style.fontSize = 100 * (docEl.clientWidth / 1440) + 'px'
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.unit = 100 * (docEl.clientWidth / 1440)
  let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 1440) + 'px'
    window.unit = 100 * (clientWidth / 1440)
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  doc.addEventListener('pageshow', recalc, false) // 后退重新计算
})(document, window)
