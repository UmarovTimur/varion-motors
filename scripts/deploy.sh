#!/usr/bin/env bash
# Deploys framer-port to the VPS through GitHub (see DEPLOY.md): local build as
# a smoke test, git push, then on the box git pull, build, pm2 restart, verify.
# The server is a git checkout of the same repo; nobody edits code there.
set -euo pipefail

HOST="ubuntu@57.129.62.155"
DIR="/srv/apex/varion-motors"
APP="varion-motors"
BRANCH="framer-port"
URL="http://camping-rent.uz"

cd "$(dirname "$0")/.."

echo "==> 1/5 local build (catches errors before touching the server)"
[ -z "$(git status --porcelain)" ] || { echo "Commit your changes first."; exit 1; }
npm run build

echo "==> 2/5 git push"
git push origin "$BRANCH"

echo "==> 3/5 git pull on the server (fails on local edits there instead of overwriting them)"
ssh "$HOST" "cd $DIR && git pull --ff-only origin $BRANCH"

echo "==> 4/5 npm ci + build + pm2 restart $APP"
ssh "$HOST" "cd $DIR && npm ci && npm run build && pm2 restart $APP"

echo "==> 5/5 verify"
sleep 2
for path in / /contact /inventory; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$URL$path")
  echo "$code $URL$path"
  [ "$code" = 200 ] || { echo "verification failed"; exit 1; }
done
echo "Deployed."
