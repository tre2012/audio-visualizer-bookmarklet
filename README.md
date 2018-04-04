Bookmarklet for injecting WebGL Canvas on current web-page and visualizing any active HTML audio sources using JavaScript.

Just bookmark ths block:

```js
javascript:(function(){__j=document.createElement('script');__j.setAttribute('src','//rawgithub.com/bartlettmic/audio-visualizer-bookmarklet/master/index.js');document.body.appendChild(__j);}());
```
Then go to your favorite YouTube video and click your new bookmark, then you should see some wild stuff!

---
TO-DO:
* [x] ~~Scrape any audio sources (designing this for youtube so check any video tags)~~
* [x] ~~Some actual visualizers~~ Prototype works!
    * [ ] Some sort of menu system
    * [ ] Load modular visualizations per-request
        * [ ] Whitelist for repo-official
        * [ ] Ability for local visualizers???? I doubt cross-origin would allow it.
    * [ ] Initialize stuff so we can optimize, it runs like dung on FireFox (as usual)
    * [ ] Per-visualizer customization (static dropdown?)
* [ ] LocalStorage for settings
    * [ ] Export/import settings
    * [ ] Toggle saving of settings
    * [ ] Detect first-time-run?
    * Optional settings:
        * [ ] Option of floating togglebox or just keyboardshortcut
        * [ ] Static full-screen or occupy video element
        * [ ] Kill video for performance boost
        * [ ] Kill visualizer on video finish
        * [ ] Delete on refresh?
        * [ ] Check for audio tags too
        * [ ] Personal whitelist?