In cPanel, click *Cron Jobs*.

Use the dropdowns to configure the schedule.

To make a weekly cron job, set it to:
```
0 0 * * 0
```

It will run at exactly 00:00 every Sunday.

For the PHP script, set command to:
```
/usr/local/bin/php /home/<ACCOUNT>/public_html/testcron.php
```

Here are more examples:

For every minute, use:
```
* * * * *
```

For every 30 minutes, use:
```
30 * * * *
```

Or every hour at minute 30, use:
```
30 * * * *
```

For every hour, use:
```
0 * * * *
```

For every 2 hours, use:
```
0 */2 * * *
```

For every day, use:
```
0 0 * * *
```

For every day at 3am, use:
```
0 3 * * *
```

For every weekday (Mon. to Fri.), use:
```
0 0 * * 1-5
```

For every month on day 1, use:
```
0 0 1 * *
```

For every 6 months, use:
```
0 0 1 */6 *
```

For every year, use:
```
0 0 1 1 *
```
