
Perhaps some A/B testing with folder-based variations.

For example:

Redirecting `/` to `4/index.php` or `2/` to `5/index.php`

```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^/?$ 4/index.php [QSA,L]
    RewriteRule ^2/?$ 5/index.php [QSA,L]
</IfModule>
```
