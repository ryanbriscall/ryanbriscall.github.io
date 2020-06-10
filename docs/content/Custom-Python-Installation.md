The Python installer let's you customize the installation.

But I noticed that the v3.x installer wanted to install Python to a long AppData-based path, and I questioned that.

In the past, Python would be installed to the root of your C:\ drive.  e.g. `C:\Python27`

So, I wanted to see how other people were installing Python 3 on Windows, and if using the installer, what customization they were doing.

In most cases, people are using the installer and selecting the Custom option, and just removing the Documentation addon.

Many people are also enabling the "Add to PATH" option.

In other cases, people are not using the installer, and instead using choco via terminal, e.g. `choco install python`

I found an interesting video on YouTube where the guy manually adds not only Python, but also a `PYTHON3_HOME` variable, to the PATH environment variables, and he added this to the System environment, instead of the User environment.

At first, he added new variable, `PYTHON3_HOME`, and set it to `C:\Python38`
Then, he modified the System PATH variable, and added two paths: `%PYTHON3_HOME%` and `%PYTHON3_HOME%\Scripts`

I found that interesting, and I think I like that approach.

I did wonder though about his reason to exclude trailing slashes on those paths, because the installer adds the paths with trailing slashes: `C:\Python38\` and `C:\Python38\Scripts\`

Also, the choice to modify the System PATH instead of the User PATH.

I've sometimes wondered if it's best practice to use the User PATH variable, from a security standpoint, limiting to User level.

But, using System PATH would also make it more accessible which might be necessary too.

I found that it's highly recommended to add Python to the System PATH, not the User PATH.  In fact, [one person said](https://stackoverflow.com/questions/9493086/python-how-do-you-run-a-py-file#comment12041931_9493145) that you can execute `.py` files by double-click (in Windows) if Python is in the System PATH.
