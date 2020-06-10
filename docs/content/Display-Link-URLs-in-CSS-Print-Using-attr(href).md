If you've made a `print.css` stylesheet for your website, or something for media type "print" (e.g. `<style media="print"></style>` or `@media { }`), then you may have wonder how to display the link addresses of hyperlinks in your text.

For example, a hyperlink of
```html
<a href="https://youtube.com">YouTube</a>
```

will display as `YouTube` text in the print-out.

But, you could display it as `YouTube (https://youtube.com)` instead.

We can do this, using CSS.

```css
a[href^="http"]:after {
    content: " ("attr(href) ")";
}
```

What about internal links? Like, hrefs starting with `/` (e.g. `<a href="/about-us">About Us</a>`)

Well, you could use this CSS:

```css
a[href^="/"]:after {
    content: " (mywebsite.com"attr(href) ")";
}
```

Now the print-out will be `About Us (mywebsite.com/about-us)`

If you have any links with only `/`, then you could use this CSS:

```css
a[href="/"]:after {
    content: "";
}
```

And for links that use anchor text of actual website addresses, e.g. <a href="https://youtube.com">youtube.com</a>, then it would be redundant to see `youtube.com (https://youtube.com/)`

Instead, we could use a class, e.g. `website`, on those particular anchor links.

```html
<a class="website" href="https://youtube.com">youtube.com</a>
```

Then CSS:

```css
a[href^="http"].website:after {
    content: "";
}
```

That's all.
