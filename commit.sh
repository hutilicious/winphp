#!/bin/bash
git add . -A
git commit -m $1
git push git@github.com:hutilicious/winphp.git master
