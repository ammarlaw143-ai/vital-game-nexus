#!/usr/bin/env bash
# Ignore --port/--host flags passed by harness; static site is served from CWD.
PORT=8080
while [[ $# -gt 0 ]]; do
  case "$1" in
    --port) PORT="$2"; shift 2;;
    --host) shift 2;;
    *) shift;;
  esac
done
exec python3 -m http.server "$PORT"
