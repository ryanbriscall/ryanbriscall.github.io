Upload file from **local to server**:
```bash
scp examplefile yourusername@yourserver:/home/yourusername/
```

Download file from **server to local**:
```bash
scp yourusername@yourserver:/home/yourusername/examplefile .
```

Transfer file from **server to server**:
```bash
scp yourusername@yourserver:/home/yourusername/examplefile yourusername2@yourserver2:/home/yourusername2/
```

Specify port:
```bash
scp -P yourport yourusername@yourserver:/home/yourusername/examplefile .
```
