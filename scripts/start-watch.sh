#!/bin/bash
set -e && source ./scripts/env.sh

rm -rf build
babel --watch --out-dir build src &
sleep 2
nodemon --watch build build/server.js
