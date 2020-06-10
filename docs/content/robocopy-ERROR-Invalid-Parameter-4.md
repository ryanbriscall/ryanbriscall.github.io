I was using robocopy in Windows Command Prompt.

But, I tried running robocopy in Git Bash, and got an error of `ERROR : Invalid Parameter #4`

You'll see from this [stackoverflow post](https://stackoverflow.com/questions/39553151/robocopy-treats-options-as-files), that the solution is simply use a double forward slash for your arguments.

For example,
```
robocopy ... //IS
```
