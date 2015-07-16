#!/bin/bash
set -e && source ./scripts/env-test.sh

babel --out-dir build src
lab $LAB_CONFIG_COV build/tests
