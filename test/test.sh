#!/bin/bash

yarn build

# Test that sort-imports command fails when imports are not sorted
if node ./dist/index.js sort-imports --check --input ./test/sample.sol; then
    echo "ERROR: sort-imports should have failed but succeeded"
    exit 1
else
    echo "✅ sort-imports correctly failed as expected"
fi

# Test that format-json command fails when JSON is not formatted
if node ./dist/index.js format-json --check --input ./test/sample.json; then
    echo "ERROR: format-json should have failed but succeeded"
    exit 1
else
    echo "✅ format-json correctly failed as expected"
fi
