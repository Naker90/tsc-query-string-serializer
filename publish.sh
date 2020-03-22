#!/bin/bash

echo "[+] Installing NPM dependencies..."
npm i

echo "[+] Clean old distribution folder..."
rm -r dist &>/dev/null

echo "[+] Compiling..."
./node_modules/typescript/bin/tsc

echo "[+] Copy package.json to dist folder"
cp package.json dist/package.json

echo "[+] Move to distribution folder"
cd dist

echo "[+] Change main file from package.json"
sed -i.bak s/src\/queryStringSerializer.ts/index.js/g package.json

echo "[+] Publish to npm..."
npm publish --dry-run
