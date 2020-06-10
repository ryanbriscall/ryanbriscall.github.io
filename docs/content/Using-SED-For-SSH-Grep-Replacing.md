At the time of this writing, SSH Grep replace doesn't exist.  What you want is SED.

`sed -i -e 's/{find}/{replace}/g' {file}`

Change all "dev." to "www." in a database file.

```bash
sed -i -e 's/dev\./www\./g' dump.sql
```

Note: the `-i` means inplace.  If you dont use `-i`, it will just output the changed file to console, without changing the source.
