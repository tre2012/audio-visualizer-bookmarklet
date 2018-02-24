Bookmarklet for injecting WebGL Canvas on current web-page and visualizing any active HTML audio sources using JavaScript.

Just bookmark ths block:

```js
javascript:(function(){var __j=document.createElement('script');__j.setAttribute('src','//rawgithub.com/bartlettmic/audio-visualizer-bookmarklet/master/index.js');document.body.appendChild(__j);}());
```

TO-DO:
* [x] ~~Don't place at bottom, just overlay with z-index~~
* [x] ~~Scrape any audio sources (designing this for youtube so check any video tags)~~
    * [ ] Check for audio tags too for versatility
    * [ ] Maybe unload on video complete?
    * [ ] Hide the video for visibility and performance improvement (can only think to set display: none)
* [ ] Set Canvas to dimensions of the video, on resize do the same
* [x] ~~Some actual visualizers~~
    * [ ] Some sort of menu system, load modular visualizations per-request
    * [ ] Initialize stuff so we can optimize, it runs like dung on FireFox (as usual)