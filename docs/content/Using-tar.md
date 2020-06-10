**Create** an archive:
```bash
tar -zcvf <new_tar_filename>.tar.gz <filename/directory>
```

**Extract** an archive:
```bash
tar -zxvf file.tar.gz
```

Create an archive without full paths:
```bash
cd ~/public_html
tar -zcvof ~/www.tar.gz ./
```

Note: There is caution of using `./`, so be warned.

Create an archive excluding files:
```
tar -zcvf myfile.tar.gz ./ --exclude='.git' --exclude='vendor' --exclude='node_modules'
```

To archive exim logs:
```bash
tar -zcvof ~/var_log.tar.gz /var/log/exim_mainlog
```

To archive access logs:
```bash
tar -zcvof ~/cpanel_access_log.tar.gz /usr/local/cpanel/logs/access_log
```

---

Exclude file permissions:

There were several attempts to this.  The final solution is specifying `--format=ustar` or `-o` when creating the archive to suppress all extended attributes.

```
cd ~/public_html
tar -zcvof ~/www.tar.gz ./
```

## Previous research

Originally tried `--no-acls --no-same-permissions`

```bash
tar --no-acls --no-same-permissions -zcvf ~/www.tar.gz ~/public_html
```

But permissions were still being appended to the filenames.

In addition, originally the command didn't work at all because of incorrect order of arguments.

The `-f` argument needs to be followed by a file.

So this command would not work:
```bash
tar -zcvf --no-acls --no-same-permissions ~/www.tar.gz ~/public_html
```

We also tried `--xattrs`, but the result was injecting permission-schema type folders into the archive, called "PaxHeaders"

That's when I found [this article](http://unix.derkeiler.com/Mailing-Lists/FreeBSD/current/2004-08/1973.html), and learned about specifying `--format=ustart` or `-o` to suppress all extended attributes.
