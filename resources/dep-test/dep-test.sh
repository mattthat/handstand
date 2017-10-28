#!/bin/bash

# clean up
if [ -d node_modules ]
then
    rm -fr node_modules package-lock.json
    echo "* cleaning up node_modules"
fi

cd ../..

if [ -f handstand-*.tgz ]
then
    rm handstand-*.tgz
    echo "* cleaning up previous handstand pack"
fi

# setup
npm pack
cd resources/dep-test
npm install

# execute
node index.js