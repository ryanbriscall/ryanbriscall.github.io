Have you ever wanted to use something more than DomDocument?

Well, I have.

It's unfortunate, but I found myself having to look further than DomDocument, for an ability to select elements by classname.

Well, anyone searching for that, e.g. "domdocument get elements by classname", might find themselves at a stackoverflow page like this:
[getting-dom-elements-by-classname](https://stackoverflow.com/questions/6366351/getting-dom-elements-by-classname)

And you might not actually like the answers you're reading.

So, you scroll further down and finally see, at the bottom of the page, a [friendly written comment](https://stackoverflow.com/a/38214201) that quickly explains a couple of downsides in a single sentence, recommends a simple library, and provides an sample script.

https://github.com/wasinger/htmlpagedom

and

```php
include 'includes/simple_html_dom.php';

$doc = str_get_html($html);
$href = $doc->find('.lastPage')[0]->href;
```

Boom, done.
