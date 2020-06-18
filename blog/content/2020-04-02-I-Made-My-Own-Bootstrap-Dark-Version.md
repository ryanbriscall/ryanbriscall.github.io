I've made a number of dark-themed web apps, in the past, that utilized the Bootstrap CSS framework.

I've seen a lot of dark-themed websites, and so I wondered if someone has developed a dark-theme for Bootstrap.

Well, I found a few, but they just weren't what I was expecting.

At the very least, their choices of what dark and light is, I felt, was too strong.

So, I decided to make my own, and do it in the simplest way possible.

I essentially reversed all the shades and colors in the `variables.scss` file.

This would allow you to simply load the *bootstrap-dark.min.css* file without having to change your HTML classes of *bg-light* or *bg-dark* for example.

With the reversal of shades, a few were customized, and while avoiding pitch black and pure white.

So black would be *#111111* instead of *#000000*, and white would be *#EEEEEE* instead of *#FFFFFF*.

I also used certain percentage adjustments with *lighten()* and *darken()* for the colors.

I released it on GitHub, and it's called [bootstrap4-dark](https://github.com/ryanbriscall/bootstrap4-dark).

That's it.

Enjoy!
