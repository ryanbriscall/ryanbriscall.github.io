I personally feel that if the official tools do not include a trailing slash, then you shouldn't either.

Well, there's [a stackoverflow article](https://stackoverflow.com/questions/980255/should-a-directory-path-variable-end-with-a-trailing-slash) about this with some interesting comments.

Among the comments of the highest rated answer there, I was happy to find someone (jmbertucci) feel the same as I do, where he says that realpath() will not print the trailing slash, and that
> Your system and tools might dictate your convention.

It's interesting to read through the remaining answers though, because some of them say otherwise.

I enjoyed reading [this answer](https://stackoverflow.com/a/980290), particularily the part:
> Pretty sure, though, that whatever you settle upon, someone else will be 100% sure it should be the other way. So, best idea is to tolerate things being set either way.

That's all.

Beyond that, I will mention that there was [another article](https://stackoverflow.com/questions/17419460/should-i-save-a-path-with-or-without-a-trailing-slash-at-the-end-whats-the-con) before this one that has only 1 answer.

These articles showed up in search results of the search phrase:
> php convention for path constants with trailing slash or no trailing slash
