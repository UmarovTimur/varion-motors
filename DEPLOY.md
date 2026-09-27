# Deploying to production

The site runs on a shared VPS, alongside several unrelated projects. Code goes
through GitHub: commit and push locally, then `git pull` + build + pm2
restart on the box. There is no CI.

## Server

- Host: `ubuntu@57.129.62.155` (sudo without password)
- Code: `/srv/apex/varion-motors` — a git checkout of branch `framer-port`
  from `github.com/UmarovTimur/varion-motors`. It fetches over HTTPS (public
  repo) and pushes over SSH with its own deploy key (host alias
  `github.com-varion` in `~/.ssh/config`). Server-only files (`HANDOFF.md`,
  `.deployed-at`, the old patch) are listed in `.git/info/exclude`.
- Process: pm2 app **`varion-motors`**, running `npm start` on
  `127.0.0.1:3002`
- Public domain: **camping-rent.uz** / **www.camping-rent.uz**, proxied to
  `:3002` by nginx (`/etc/nginx/sites-enabled/camping-rent.uz`). Served over
  HTTP only — Cloudflare terminates TLS at the edge, there's no origin cert
  for this domain.
- A second pm2 app, **`varion-dev`** (`next dev -p 3003`, same directory),
  is **stopped**: development happens locally, the box only runs the build.
  Don't edit code on the server — change it locally, push, and pull there.

**Other apps on the same box — never touch their config or restart them as a
side effect:** `admin` / `az` (`/home/ubuntu/srv/MBC_NEXT`), `incilaz.com`
(`:3001`, `/payload/` → `:8001`), `rentent.uz` (`:5173`), `calendars2026`
(the default/IP-only nginx site).

## Deploy script

```bash
./scripts/deploy.sh   # clean tree check -> local build -> git push -> server pull -> build -> pm2 restart -> curl check
```

## Deploy steps (manual)

1. **Build locally first** (`npm run build`), as a smoke test. A failed build
   *on the box* deletes the old `.next` before the new one exists, which means
   downtime. It also clobbers a running local `next dev` — restart it after.
2. **Commit and push** `framer-port` to GitHub.
3. **On the server:**

   ```bash
   ssh ubuntu@57.129.62.155 "cd /srv/apex/varion-motors && git pull --ff-only && npm ci && npm run build && pm2 restart varion-motors"
   ```

   `--ff-only` makes the pull stop instead of merging if someone did edit or
   commit on the box — check `git status` there and bring those changes
   through GitHub first.
4. **Verify:** `curl -s -o /dev/null -w '%{http_code}\n' http://camping-rent.uz/`,
   and `pm2 list` should show `varion-motors` online with a fresh uptime.

## Known gaps

- The pm2 boot service isn't installed (`systemctl is-enabled pm2-ubuntu` →
  not found), so after a server reboot none of the pm2 apps — not just this
  one — come back on their own. `pm2 save` has been run; `pm2 startup` has
  not. Enabling it affects every app on the box, so ask before doing it.
- Cloudflare's Email Address Obfuscation rewrites any raw e-mail address in
  the HTML, which broke hydration in the footer. It's now rendered split
  across spans to dodge the scan — don't put a plain `mailto:`/email string
  back in markup that Cloudflare proxies.
