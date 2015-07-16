#!/bin/bash
set -e && source ./scripts/env.sh

babel --out-dir build --ignore src/tests src
node build/server.js
