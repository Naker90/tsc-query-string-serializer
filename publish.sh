#!/bin/bash

source scripts/utils.sh

lib_version=$1

function clean() {
	if [ -d dist ]; then
		showMessage ${YELLOW} "[INFO] Clean old distribution folder..."
		rm -r dist
	fi
	if [ -d node_modules ]; then
		showMessage ${YELLOW} "${YELLOW}[INFO] Clean old instaled node modules..."
		rm -r node_modules
	fi
}

function installNpmDependencies() {
	if [ ! -f package.json ]; then
		showMessage ${RED} "[ERR!] package.json must exist."
		exit 1
	fi
	showMessage ${YELLOW} "[INFO] Installing NPM dependencies..."
	npm i
	exitIfLastCommandFail "Npm dependencies instalation fails."
}

function compile() {
	if [ ! -f ./node_modules/typescript/bin/tsc ]; then
		showMessage ${RED} "[ERR!] TypeScript must be a dependency of the project."
		exit 1
	fi
	showMessage ${YELLOW} "[INFO] Compiling..."
	./node_modules/typescript/bin/tsc
	exitIfLastCommandFail "TypeScript compilation fails."
}

function movePackageConfigFileToDistributionFolder(){
	showMessage ${YELLOW} "[INFO] Move package.json to distribution folder and change main file to index.js..."
	sed "s/src\/queryStringSerializer.ts/index.js/g" package.json > dist/package.json
}

function copyReadmeFile() {
	showMessage ${YELLOW} "[INFO] Copy README file..."
	cp README.md dist/README.md
}

function markCommitWithLibVersion() {
    grep "\"version\": \"$lib_version\"" package.json &> /dev/null
    exitIfLastCommandFail "The version specified is not the same as the one defined in package.json."
    git tag -a "v${lib_version}" -m "release"
}

function moveToDistributionFolder() {
	showMessage ${YELLOW} "[INFO] Move to distribution folder..."
	cd dist
}

function publishPackage() {
	showMessage ${YELLOW} "[INFO] Publish to npm..."
	npm publish 
	exitIfLastCommandFail "NPM package publication fails."
}

function showSuccessMessage() {
	showMessage ${GREEN} "[SUCC] Package published successfully."
	exit 0
}

clean
installNpmDependencies
compile
markCommitWithLibVersion
copyReadmeFile
movePackageConfigFileToDistributionFolder
moveToDistributionFolder
publishPackage
showSuccessMessage
