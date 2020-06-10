There are 3 different ways you can compile Sass:

- Using the original Ruby Sass binary, installed by `gem install sass`, and then `sassc myfile.scss myfile.css`.
- Using a GUI app such as [Koala](http://koala-app.com/), or [Compass](http://compass.kkbox.com/). For Mac, there is [Hammer](http://hammerformac.com/), or [CodeKit](https://incident57.com/codekit/).
- Using the Node.js terminal command `node-sass`, which is `libsass`, a blazing fast Sass compiler written in C. `npm install node-sass`.

Note, libsass may not be in 100% feature parity with Ruby Sass.

Tip, if you want to just play around, or share examples, then try [Sassmeister](http://sassmeister.com/). It is a web based Sass playground.

The major benefit to using a GUI app, is simplicity.  Just install the software, and run it.  The options within are simple toggles (checkboxes).

And most, if not all, GUI apps support file watching (monitor and auto-compile on detection of file changes).

But, the GUI app can sometimes feel like a strange dependancy when compared to a Node.js solution of compiling Sass, especially if your project is heavily frontend-based and therefore already utilizing Node and/or NPM.

The only downside to using `node-sass` is that it adds thousands upon thousands of folders and files to your project (the `node_modules` folder), which always feels wrong to me.

Sure, you could install `node-sass` globally, but that has it's own issues as well.

Now, with `node-sass`, or something equivalent in Node.js, I sort of feel less dependent in a way now though; not having to install a GUI app, and instead simply running `npm install` on any project and having a solution (perhaps a `script` within package.json) available to compile (and/or watch/auto-compile) sass.

Especially when I'm in VSCode, having a terminal already available.

The built-in terminal felt like a better dependency than a 3rd-party GUI app outside of my environment.

With a couple of `npm` commands, you're good to go.

True, this requires Node.js to be installed. But, that's common now.

First time? Then go to the root of your project and run `npm init`.

A package.json file will be created in the root of your project.

Install node-sass:

```
$ npm install --save-dev node-sass
```

Run:

```
node-sass -o dist/css assets/scss/style.scss
```

Error? `bash: node-sass: command not found`

This is because only **globally installed** packages can be executed by typing their name _only_.

To fix this, you can type the local path:

```
$ ./node_modules/.bin/node-sass ...
```

You could also technically run a locally installed package by editing your `package.json` file and adding that package in the `scripts` section:

```json
{
  "name": "whatever",
  "version": "1.0.0",
  "scripts": {
    "node-sass": "node-sass"
  }
}
```

Then run the script using `npm run-script` (or `npm run`):

```
$ npm run node-sass
```

Or you could add `./node_modules/.bin` to your `PATH` environment variable. But, be aware that this only works when your current working directory is the root of your project.

There is a trick to work around that, described on stackoverflow [here](https://stackoverflow.com/a/15157360).

There is another solution, using `npx`.

`npx` will check whether `<command>` exists in `$PATH`, or in the local project binaries, and execute it.

You can read more about `npx` on stackoverflow, [here](https://stackoverflow.com/a/52018825)

The `-w` flag will automatically compile files.
And the `-r` flag will find all files, recursively.

```
node-sass -w -r src/scss/ -o dist/css/
```

You could create your own scripts:

```json
{
  "scripts": {
    "sass": "node-sass -r src/scss/ -o dist/css/",
    "sass:watch": "node-sass -w -r src/scss/ -o dist/css/",
    "sass:prod": "node-sass -r src/scss/ -o dist/css/ --output-style compressed"
  }
}
```

Run:

```
$ npm run sass
```
