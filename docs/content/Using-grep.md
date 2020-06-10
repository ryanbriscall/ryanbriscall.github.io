Search hosts for exact case phrase 'www'
```bash
grep www /etc/hosts
```

Ignore case sensitivity.
```bash
grep -i www /etc/hosts
```

Search file for a phrase or pattern.
```bash
grep -i 'A phrase goes here.' test.txt
```

Search recursively.
```
grep '127.0.0.1' /etc/ -r
```

Displays MISMATCHED lines.
```bash
grep -v www /etc/hosts
```

Display line numbers.
```bash
grep -n www /etc/hosts
```

Display the Total Count of matches.
```bash
grep -c www /etc/hosts
```

Display a Total Count of lines Without any Case variation of 'www'
```bash
grep -ivc www /etc/hosts
```

