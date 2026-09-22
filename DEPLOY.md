# Deploying to production

The site runs on a shared VPS, alongside several unrelated projects. There is
no git remote and no CI — deploys are a manual rsync + build + pm2 restart.

## Server

- Host: `ubuntu@57.129.62.155` (sudo without password)
- Code: `/srv/apex/varion-motors` — a plain copy of this working tree (no
  `node_modules`, `.next`, or `.git`; there's no git remote, so the code on
  the box exists only because it was rsynced there)
- Process: pm2 app **`varion-motors`**, running `npm start` on
  `127.0.0.1:3002`
- Public domain: **camping-rent.uz** / **www.camping-rent.uz**, proxied to
  `:3002` by nginx (`/etc/nginx/sites-enabled/camping-rent.uz`). Served over
  HTTP only — Cloudflare terminates TLS at the edge, there's no origin cert
  for this domain.
- A second pm2 app, **`varion-dev`** (`next dev -p 3003`, same directory),
  exists for on-box editing but is normally **stopped**. Don't start it
  unless you're intentionally switching the domain to a live dev server —
  that also means flipping nginx's `proxy_pass` between `:3002`/`:3003`.

**Other apps on the same box — never touch their config or restart them as a
side effect:** `admin` / `az` (`/home/ubuntu/srv/MBC_NEXT`), `incilaz.com`
(`:3001`, `/payload/` → `:8001`), `rentent.uz` (`:5173`), `calendars2026`
(the default/IP-only nginx site).

## Deploy steps

Run these from the local repo root.

1. **Build locally first**, as a smoke test. A failed build *on the box*
   deletes the old `.next` before the new one exists, which means downtime —
   catch compile/type errors here instead:

   ```bash
   npm run build
   ```

   This clobbers a locally running `next dev` server's `.next` directory —
   restart `npm run dev` afterwards if you had one running.

2. **Check for on-box edits before overwriting anything.** People
   (including Claude sessions) sometimes edit directly on the server. Dry-run
   a pull in the opposite direction and make sure every listed file is one
   *you* changed locally this session — if something unexpected shows up,
   stop and reconcile it first instead of overwriting it:

   ```bash
   rsync -rlcni --exclude node_modules --exclude .next --exclude .git \
     ubuntu@57.129.62.155:/srv/apex/varion-motors/ ./
   ```

3. **Push the working tree to the server.** Never add `--delete` —
   `HANDOFF.md` and other files live only on the box.

   ```bash
   rsync -rlc --info=stats1,name \
     --exclude node_modules --exclude .next --exclude .git \
     ./ ubuntu@57.129.62.155:/srv/apex/varion-motors/
   ```

4. **Install deps and build on the server:**

   ```bash
   ssh ubuntu@57.129.62.155 "cd /srv/apex/varion-motors && npm ci && npm run build"
   ```

5. **Restart the running process:**

   ```bash
   ssh ubuntu@57.129.62.155 "pm2 restart varion-motors"
   ```

6. **Verify:**

   ```bash
   curl -s -o /dev/null -w '%{http_code}\n' http://camping-rent.uz/
   ```

   `pm2 list` on the box should show `varion-motors` as `online` with a
   fresh uptime; `pm2 logs varion-motors --lines 50` if it isn't.

## Known gaps

- The pm2 boot service isn't installed (`systemctl is-enabled pm2-ubuntu` →
  not found), so after a server reboot none of the pm2 apps — not just this
  one — come back on their own. `pm2 save` has been run; `pm2 startup` has
  not. Enabling it affects every app on the box, so ask before doing it.
- Cloudflare's Email Address Obfuscation rewrites any raw e-mail address in
  the HTML, which broke hydration in the footer. It's now rendered split
  across spans to dodge the scan — don't put a plain `mailto:`/email string
  back in markup that Cloudflare proxies.
