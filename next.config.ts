import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `next dev` only trusts the origin it was started with (localhost). Opening
   * the site from a phone on the LAN blocks the dev-only endpoints, the HMR
   * socket handshake fails, and the page renders but never hydrates — no menu,
   * no buttons, no interactivity at all. Listing the private ranges here fixes
   * device testing; it has no effect on `next build`.
   */
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "*.local",
    // The dev server also runs on the VPS behind nginx, served on the real
    // domain, so the domain itself has to be a trusted dev origin.
    "camping-rent.uz",
    "www.camping-rent.uz",
    "57.129.62.155",
  ],
};

export default nextConfig;
