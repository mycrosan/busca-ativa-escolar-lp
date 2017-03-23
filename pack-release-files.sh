#!/bin/sh
rm -f ./release.zip
rm -f src.zip
zip -0 -9 ./release.zip -r -u public/* -x@do-not-pack.lst
zip -0 -9 ./src.zip -r -u . -x@do-not-pack.lst
