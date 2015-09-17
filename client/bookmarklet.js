export default function bookmarklet (url) {
  return `javascript:;function dldr(w) {
var dst='${url}?';
var l=w.location.href;
window.location.href=dst+l;
} dldr(window); void(0)`.replace('\n', '')
}
