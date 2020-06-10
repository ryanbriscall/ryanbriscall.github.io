## Using xcopy to backup files.

**Update: After the time of this writing, I switched from xcopy to robocopy.**

Example:

```
xcopy "C:\Users\Ryan\*.*" "D:\Backup\" /K /D /H /E /Q /Y
```

- **/K** Copies attributes. Normal Xcopy will reset read-only attributes.
- **/D:m-d-y** Copies files changed on or after the specified date.
  If no date is given, copies only those files whose
  source time is newer than the destination time.
- **/H** Copies hidden and system files also.
- **/E** Copies directories and subdirectories, including empty ones.
  Same as /S /E. May be used to modify /T.
- **/Q** Does not display file names while copying.
- **/Y** Suppresses prompting to confirm you want to overwrite an
  existing destination file.

---

- **/F** Displays full source and destination file names while copying.
- **/C** Continues copying even if errors occur.
- **/G** Allows the copying of encrypted files to destination that does
  not support encryption.
- **/B** Copies the Symbolic Link itself versus the target of the link.
- **/M** Copies only files with the archive attribute set,
  turns off the archive attribute.
