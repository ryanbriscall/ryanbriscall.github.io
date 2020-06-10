I've seen many websites on shared hosting providers use `644` for files, and `755` for directories.

To chmod and folders separately:
```
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
```

If you ever want to chmod both files and folders:
```
chmod 755 -R ~/public_html
```
