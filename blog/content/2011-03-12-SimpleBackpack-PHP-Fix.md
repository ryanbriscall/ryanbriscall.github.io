As shown on [developer.37signals.com](http://developer.37signals.com/), you'll find the PHP wrapper [SimpleBackpack](http://www.engadgeted.net/projects/simplebackpack-php-wrapper-class-for-backpack-api/) for communicating with the [Backpack API](http://developer.37signals.com/backpack/).

However, some of the sample code is outdated.

Here are a couple of things you need to change:

Line 39:

Change:

    ```php
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-POST_DATA_FORMAT: xml'));
    ```

To:

    ```php
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml'));
    ```

Line 42:

Insert:

    ```php
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    ```

Before:

    ```php
    $data = curl_exec($ch);
    ```

Line 187:

Outdated:

    ```php
    function export_backpack() {
    ```

Reason:

37signals reported that they've replaced `/ws/account/export` with `/#{token}/users/#{id}.xml`

This is not an easy fix, therefore do not use `$bp->export_backpack()` for the time being.
</pre>

With regard to the second fix there, if you’d like to fix it the RIGHT way then please review: [Using cURL in PHP to access HTTPS (SSL/TLS) protected sites](http://unitstep.net/blog/2009/05/05/using-curl-in-php-to-access-https-ssltls-protected-sites/)
