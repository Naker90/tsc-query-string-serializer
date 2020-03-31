#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

function showMessage(){
	color=$1
	message=$2
	echo -e "$color$message$NC"
}

function exitIfLastCommandFail() {
	lastCommandStatus=$?
	if [ $lastCommandStatus -eq 1 ]; then
		showMessage ${RED} "[ERR!] $1."
		exit 1
	fi
}
