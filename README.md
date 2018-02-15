Bookmarklet for injecting WebGL Canvas on current web-page and visualizing any active HTML audio sources using JavaScript.

Just bookmark ths block:

```js
javascript:(function(){var __j=document.createElement('script');__j.setAttribute('src','//rawgithub.com/bartlettmic/audio-visualizer-bookmarklet/master/index.js');document.body.appendChild(__j);delete __j}());
```

TO-DO:
* [x] Don't place at bottom, just overlay with z-index
* [ ] Scrape any audio sources (designing this for youtube so check any video tags)
* [ ] Idk, some actual visualizers? :'^)
* [ ] Some sort of menu system, load modular visualizations per-request