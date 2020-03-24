#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
lib_version=$1

function exitIfLastCommandFail() {
	if [ $? -eq 1 ]; then
		echo -e "${RED}[ERR!] $1."
		exit 1
	fi
}

function clean() {
	if [ -d dist ]; then
		echo -e "${YELLOW}[INFO] Clean old distribution folder..."
		rm -r dist
	fi
	if [ -d node_modules ]; then
		echo -e "${YELLOW}[INFO] Clean old instaled node modules..."
		rm -r node_modules
	fi
}

function installNpmDependencies() {
	if [ ! -f package.json ]; then
		echo -e "${RED}[ERR!] package.json must exist."
		exit 1
	fi
	echo -e "${YELLOW}[INFO] Installing NPM dependencies..."
	npm i
	exitIfLastCommandFail "Npm dependencies instalation fails."
}

function compile() {
	if [ ! -f ./node_modules/typescript/bin/tsc ]; then
		echo -e "${RED}[ERR!] TypeScript must be a dependency of the project."
		exit 1
	fi
	echo -e "${YELLOW}[INFO] Compiling..."
	./node_modules/typescript/bin/tsc
	exitIfLastCommandFail "TypeScript compilation fails."
}

function movePackageConfigFileToDistributionFolder(){
	echo -e "${YELLOW}[INFO] Move package.json to distribution folder and change main file to index.js"
	sed "s/src\/queryStringSerializer.ts/index.js/g" package.json > dist/package.json
}

function markCommitWithLibVersion() {
    grep "\"version\": \"$lib_version\"" package.json &> /dev/null
    exitIfLastCommandFail "The version specified is not the same as the one defined in package.json"
    git tag -a "v${lib_version}" -m "release"
}

function moveToDistributionFolder() {
	echo -e "${YELLOW}[INFO] Move to distribution folder"
	cd dist
}

function publishPackage() {
	echo -e "${YELLOW}[INFO] Publish to npm..."
	npm publish --dry-run
	exitIfLastCommandFail "NPM package publication fails."
}

function showSuccessMessage() {
	echo -e "${GREEN}[SUCC] Package published successfully."
	exit 0
}

clean
installNpmDependencies
compile
markCommitWithLibVersion
movePackageConfigFileToDistributionFolder
moveToDistributionFolder
publishPackage
showSuccessMessage
