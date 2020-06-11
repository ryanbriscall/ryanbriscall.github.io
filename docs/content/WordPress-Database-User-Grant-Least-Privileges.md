## Create the database w/ specific collation:

Note: `utf8_general_ci` is no longer recommended best practice.

~~CREATE DATABASE `my_wordpress` CHARACTER SET utf8 COLLATE utf8_general_ci;~~

Use `utf8mb4_general_ci` instead.

```sql
CREATE DATABASE `my_wordpress` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

OR

```sql
CREATE DATABASE `my_wordpress` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
```

If you'd like to read more about the differences between `general` vs `unicode`, then see this [stackoverflow article](https://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci).

## Create a user:

```sql
CREATE USER 'my_admin'@'localhost' IDENTIFIED BY 'my_password';
```

## Grant user permissions:

It is recommended to follow the security principle of *least privilege*, and therefore the only permissions needed for WordPress are `SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE, DROP, INDEX, CREATE TEMPORARY TABLES, LOCK TABLES`

```sql
GRANT SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE, DROP, INDEX, CREATE TEMPORARY TABLES, LOCK TABLES ON my_wordpress.* TO 'my_admin'@'localhost';
```

Otherwise, you can assign all permissions by using `ALL PRIVILEGES`:
```sql
GRANT ALL PRIVILEGES ON my_wordpress.* TO 'my_admin'@'localhost'
```
