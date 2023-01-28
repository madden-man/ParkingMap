# NeedAndGive

## Loading code to site

First build the React code:

```
cd js
npm install
npm run build
```

Then upload these files to the needandgive plugin:
.
├── js
│   ├── build/**/*
└── needandgive.php

## Uploading files

You can use the https://marketplace.visualstudio.com/items?itemName=Natizyskunk.sftp vscode app to sync files to the plugin

Use this sftp config:

```json
// .vscode/sftp.json
{
  "name": "denverchurch.org",
  "host": "get from web provider",
  "protocol": "sftp",
  "port": "get from web provider",
  "username": "get from web provider",
  "remotePath": "path to needandgive plugin",
  "useTempFile": false,
  "openSsh": false,
  "privateKeyPath": "path to private key",
  "uploadOnSave": true,
  "ignore": [
    ".vscode",
    ".git",
    ".DS_Store",
    "js/node_modules",
    "js/src"
  ]
}
```
