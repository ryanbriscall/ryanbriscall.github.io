Is your PHP `$_GET` empty when using Rewrite in `.htaccess` ?

Well, adding `-MultiViews` to your `.htaccess` file may fix that.

I found [https://stackoverflow.com/a/27735355](this comment) on stackoverflow, and Jon says:
> You must turn off `Multiviews`, otherwise mod_negotiation will automatically map /foo/ to /foo.php without giving mod_rewrite a chance to do anything.

In my case, he was right.

Once I disabled `MultiViews`, my Rewrite rule then worked correctly, and the `$_GET` was no longer empty.
