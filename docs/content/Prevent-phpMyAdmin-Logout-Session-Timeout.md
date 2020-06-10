Are you getting tired of being logged out of your localhost/phpmyadmin ?

Insert into index.php:
```php
ini_set('session.gc_maxlifetime', 432000);
```

Insert into config.inc.php:
```php
$cfg['LoginCookieValidity'] = 432000;
```
