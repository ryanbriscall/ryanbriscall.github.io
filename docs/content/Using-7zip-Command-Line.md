Using-7zip-Command-Line

[http://www.dotnetperls.com/7-zip-examples](http://www.dotnetperls.com/7-zip-examples)

Create archive (in Windows Command Prompt):

```
7z a -t7z C:\Dell\test.7z C:\Temp\*
```

NOTE: Using an absolute path, and having a trailing asterix "`*`" will make the archive add those files as relative (no absolute path of `C:\Temp`)

```
"C:\Program Files\7-Zip\7z.exe" a -t7z C:\Users\<User>\test.7z C:\Users\<User>\test\* -mx0 -x!.git -x!node_modules -x!nbproject
```

Tip: Use `-tzip` for generateing .zip files.

Azure Website example:

```
D:\7zip\7za.exe a -t7z D:\home\site\wwwroot-backup.7z D:\home\site\wwwroot\*
```

or
```
D:\7zip\7za.exe a -t7z D:\home\site\wwwroot-core-backup.7z D:\home\site\wwwroot\* -mx0 -x!sites
```

or preferably

```
D:\7zip\7za.exe a -t7z D:\home\site\wwwroot-core-backup.7z D:\home\site\wwwroot\* -mx0 -x!sites\default
```

or

```
D:\7zip\7za.exe a -t7z D:\home\site\temp\backups\wwwroot-default-files.7z D:\home\site\wwwroot\sites\default\* -mx0 -x!files\downloads -x!files\PDFs -x!"files\user downloads"
```

or

```
D:\7zip\7za.exe a -t7z "D:\home\site\LogFiles 2015-02-28.7z" D:\home\LogFiles\*
```

Exclude directories:

[http://superuser.com/questions/97342/7zip-command-line-exclude-folders-by-wildcard-pattern](http://superuser.com/questions/97342/7zip-command-line-exclude-folders-by-wildcard-pattern)

Extract archive:

Tip: Use `-aos` option to skip overwriting files.

```
7z x -r C:\Dell\test.7z
```

Azure Website example (from within `wwwroot` folder):

```
D:\7zip\7za.exe x -r D:\home\site\wwwroot-backup.7z
```

Azure Website example - Drupal public files (from within the `files/` folder):

```
D:\7zip\7za.exe x -r D:\home\site\temp\backups\wwwroot-files-backup.7z
```

or (Auto-overwrite):

```
D:\7zip\7za.exe x -r -aoa D:\home\site\temp\backups\wwwroot-sites-default.7z
```

Azure Website example - More public files (from within the files/PDF/ folder):

```
D:\7zip\7za.exe x -r D:\home\site\temp\backups\wwwroot-files-PDF-backup.7z
```
