import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { LeadDialog } from "@/components/ui/lead-dialog";
import { site } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — авто из Китая и Кореи под ключ`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

/**
 * Zoom is disabled and the page opens at 1:1 (no zoomed-in start). A static
 * `width=425` cannot do the "minimum width 425px" job: with `initial-scale=1`
 * phones narrower than 425 open zoomed in and scroll sideways, and without it
 * some browsers zoom on their own. So `minWidthScript` below rewrites the tag
 * on narrow screens with an explicit scale of screenWidth / 425, which fits
 * the 425px layout exactly. iOS Safari ignores `user-scalable=no`, so double-tap
 * zoom is also blocked with `touch-action: manipulation` in globals.css.
 * Next's hydration inserts a second viewport tag (and swaps it on client
 * navigation), and the browser obeys the last one — so the script rewrites
 * every viewport tag and keeps watching <head>.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const minWidthScript = `(function(){
var MIN=425;
function want(){
  var s=window.screen,land=s.orientation?s.orientation.type.indexOf('landscape')===0:window.innerWidth>window.innerHeight;
  var w=land?Math.max(s.width,s.height):Math.min(s.width,s.height);
  if(w>=MIN)return 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
  var k=(w/MIN).toFixed(4);
  return 'width='+MIN+', initial-scale='+k+', minimum-scale='+k+', maximum-scale='+k+', user-scalable=no';
}
function apply(){
  var c=want(),ms=document.querySelectorAll('meta[name="viewport"]');
  for(var i=0;i<ms.length;i++)if(ms[i].getAttribute('content')!==c)ms[i].setAttribute('content',c);
}
apply();
window.addEventListener('orientationchange',function(){setTimeout(apply,150);});
new MutationObserver(apply).observe(document.head,{childList:true,subtree:true,attributes:true,attributeFilter:['content']});
})();`;

/** Template component (§1) — Nav and Footer wrap every page. */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={spaceGrotesk.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: minWidthScript }} />
      </head>
      <body className="font-sans antialiased">
        <Nav />
        <main className="flex flex-col gap-16 tablet:gap-32 desktop:gap-36">
          {children}
        </main>
        <Footer />
        <LeadDialog />
      </body>
    </html>
  );
}
