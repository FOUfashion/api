#!/bin/bash
set -e && source ./scripts/env-test.sh

babel --watch --out-dir build src &
sleep 2
nodemon --watch build --exec "lab $LAB_CONFIG build/tests"
