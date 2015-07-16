#!/bin/bash
set -e && source ./scripts/env.sh

rm -rf build
babel --out-dir build --ignore src/tests src
node build/server.js
