#!/usr/bin/env bash
# Deploys the working tree to the VPS (see DEPLOY.md): local build as a smoke
# test, push via rsync, build on the box, pm2 restart, verify.
#   SKIP_CHECK=1 ./scripts/deploy.sh   push even if files were edited on the box
set -euo pipefail

HOST="ubuntu@57.129.62.155"
DIR="/srv/apex/varion-motors"
APP="varion-motors"
URL="http://camping-rent.uz"
EXCLUDES=(--exclude node_modules --exclude .next --exclude .git)

cd "$(dirname "$0")/.."

echo "==> 1/6 local build (catches errors before touching the server)"
npm run build

echo "==> 2/6 checking for edits made on the server since the last deploy"
if ssh "$HOST" "test -f $DIR/.deployed-at"; then
  changed=$(ssh "$HOST" "cd $DIR && find . -type f -newer .deployed-at \
    -not -path './node_modules/*' -not -path './.next/*' -not -path './.git/*' \
    -not -name .deployed-at -not -name tsconfig.tsbuildinfo -not -name next-env.d.ts")
  if [ -n "$changed" ] && [ "${SKIP_CHECK:-}" != "1" ]; then
    echo "Files on the server changed after the last deploy:"
    echo "$changed"
    echo "Pull or reconcile them first, or rerun with SKIP_CHECK=1 to overwrite."
    exit 1
  fi
else
  echo "no .deployed-at stamp yet (first scripted deploy) - skipping"
fi

echo "==> 3/6 rsync (no --delete: server-only files like HANDOFF.md stay)"
rsync -rlc --info=stats1,name "${EXCLUDES[@]}" ./ "$HOST:$DIR/"

echo "==> 4/6 npm ci + build on the server"
ssh "$HOST" "cd $DIR && npm ci && npm run build"

echo "==> 5/6 pm2 restart $APP"
ssh "$HOST" "pm2 restart $APP && touch $DIR/.deployed-at"

echo "==> 6/6 verify"
sleep 2
for path in / /contact; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$URL$path")
  echo "$code $URL$path"
  [ "$code" = 200 ] || { echo "verification failed"; exit 1; }
done
echo "Deployed."
