Recognize this code?
```
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```

It's the code in your .htaccess file for friendly URLs.

Now, recognize this code?
```
<FilesMatch "\.(ico|png|jpg|css|js)$">
  ErrorDocument 404 "404 - The requested file was not found."
</FilesMatch>
```

Well, does that code work for you?

If not, then here's a solution:

```
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule \.(ico|png|jpg|css|js)$ - [nocase,redirect=404,last]
```

Then, you might add more extensions:
```
RewriteRule \.(gif|jpg|jpeg|png|gif|ico|swf|bmp|js|css|s?html|php|xml|txt)$ - [nocase,redirect=404,last]
```

Or, you might simply target any possible extension:
```
RewriteRule \.([a-z]{1,5})$ - [nocase,redirect=404,last]
```

Finally, your code might look like:
```
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule \.([a-z]{1,5})$ - [NC,R=404,L]

RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```

That's all.

It took me a while to find that solution.  So, I decided to write about it.

Have fun!
