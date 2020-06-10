Have you ever tried switching from Chrome to FireFox?

Did you notice that the mousewheel scroll speed in FireFox is too fast?

To fix this, you can type `about:config` in FireFox's address bar, and change the following:

`general.smoothScroll.mouseWheel.durationMaxMS` **200**
`general.smoothScroll.mouseWheel.durationMinMS` **100**
`mousewheel.system_scroll_override_on_root_content.vertical.factor` **120**

This worked fairly well for me on Windows 10, with default mouse settings, at 3 lines per scroll.
