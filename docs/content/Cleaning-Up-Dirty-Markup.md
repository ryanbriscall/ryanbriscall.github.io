Need to clean your dirty HTML?

Something more than strip_tags()?

Something that not only strips tags, but attributes too.

Well, I did, and others too.

After some research, I found [this comment](https://stackoverflow.com/a/15449868) on stackoverflow.

You'll see a library called HTML Purifier.

In fact, several people recommended [HTML Purifier](http://htmlpurifier.org/)

I tried it, and it works great.

You can install it via composer:
```
composer require ezyang/htmlpurifier
```

Here is some sample code:
```php
$config = HTMLPurifier_Config::createDefault();
$config->set('HTML.Allowed', 'h1,h2,h3,h4,h5,h6,p,b,ul,ol,li,strong,a[href],i,br,img[src]');
$purifier = new HTMLPurifier($config);
$clean_html = $purifier->purify($dirty_html);
```

That's all.
