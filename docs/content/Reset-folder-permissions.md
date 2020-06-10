In Windows, it is called `icalcs`.

To reset files permissions:

* Run `cmd` as Administrator
* Go to the drive or folder, for example:

```
CD /D D:
```

Reset all the files permissions:

```
icacls * /T /Q /C /RESET
```

That’s it!
