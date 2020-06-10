So you've installed Python and, if on Windows, added it to your System PATH environment variable.

Now, if you want to run a python script without typing `python` first, then you can already with recent versions of Windows, but on Linux you'll need to add `#!/usr/bin/env python` line to the top of your script.

There are two ways to specify the path to the interpreter:

- `#!/usr/bin/python`: writing the absolute path
- `#!/usr/bin/env python`: using the operating system env command, which locates and executes Python by searching the PATH environment variable

This last option is useful if you bear in mind that not all Unix-like systems locate the interpreter in the same place.

As well, on Linux, you'll need to set execute permissions on the script. E.g. `chmod +x test.py`

Now, if you want to run a python script without including the `.py` extension, then edit the `PATHEXT` System environment variable, in Windows, and add `;.PY` to it.

Now, in Windows Command, typing `test` is the same as typing `python test.py`
