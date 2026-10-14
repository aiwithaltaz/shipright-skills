#!/usr/bin/env bash
set -eu
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
deps_dir=/tmp/shipright-manuscript-tools
mkdir -p "$deps_dir"
cp "$script_dir/package.json" "$deps_dir/package.json"
cp "$script_dir/package-lock.json" "$deps_dir/package-lock.json"
npm ci --prefix "$deps_dir" --cache /workspace/.shipright-tools/npm-cache
