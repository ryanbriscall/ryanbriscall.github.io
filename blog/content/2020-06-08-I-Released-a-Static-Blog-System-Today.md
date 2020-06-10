So I released a simple static SPA blog system today on GitHub, called [SimpleStaticBlog](https://github.com/ryanbriscall/SimpleStaticBlog).

I plan to use this as my blog system because it's static, which will be added to my static website hosted on GitHub Pages.

This all started when I lost my job, and having trouble finding work, and yet still having to pay bills.

One of those bills is not only for web hosting, but for domain registration too.

I realized that I had become financially dependent on something that I felt shouldn't be.

Sure, I found some free PHP hosting, but it was sketchy, and I realized that I was becoming dependent on the PHP tech stack.

Before I lost my job, I originally setup a WordPress blog, and implemented about 12 layers of security, hiding the admin and login pages, disabling the xmlrpc API, disabling comments, to name a few.

But I found myself feeling bound down by this tech stack, and again having this feeling dependence on it.  I wanted something that would last many years; something that wouldn't require ongoing maintenance (e.g. security updates) and such.

So I decided to downgrade to a simple single-script PHP blog system, with a flat-file database, and using AJAX to fetch posts via API using a basic $_GET parameter.

But again, I found myself feeling bound down and too dependant to this tech stack, because even PHP itself requires ongoing maintenance, and we've seen this many times over the years where sites break after PHP is updated.

So if you're in the same boat as me, and like this idea, then give it a try.

Enjoy!
