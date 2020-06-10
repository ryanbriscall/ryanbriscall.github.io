Setup your SSH key:
```
ssh-keygen -t rsa
```

You can press `ENTER` for every answer.

The public key will be in the `~/.ssh/id_rsa.pub` file, or `C:\Users\<User>\.ssh\id_rsa.pub` file on Windows.

You can copy/paste the contents of that into your account settings (SSH Keys area) on services like GitHub for example.

---

Adding your key to a server:

```bash
cd ~
mkdir .ssh
cd .ssh
touch known_hosts
touch authorized_keys
nano authorized_keys (copy/paste your key, and save.)
chmod 700 .
chmod 600 ./*
chmod 644 known_hosts
chown -R {your account}:{your account} .
```

Creating a key on the server:
```bash
cd ~/.ssh
ssh-keygen -t rsa
chmod 644 id_rsa.pub
```

---

(Optional) Setup multiple keys (using `~/.ssh/config`):

- In `~/.ssh/config`, add:

```
Host gh
  Hostname github.com
  User git
  IdentityFile ~/.ssh/somekey
```
Now you can do git clone ssh://gh/username/repo.git.

Example:

```
Host workbb
  HostName bitbucket.org
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_work

Host personalbb
  HostName bitbucket.org
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa
```

Now you can do:
```bash
git remote add origin workbb:intertech/website.git
```
