#!/bin/bash

echo "[+] Installing NPM dependencies..."
npm i

echo "[+] Clean old distribution folder..."
rm -r dist &>/dev/null

echo "[+] Compiling..."
./node_modules/typescript/bin/tsc

echo "[+] Move package.json to distribution folder and change main file to index.js"
sed "s/src\/queryStringSerializer.ts/index.js/g" package.json > dist/package.json

echo "[+] Move to distribution folder"
cd dist

echo "[+] Publish to npm..."
npm publish --dry-run
