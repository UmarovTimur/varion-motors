import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";

/** Call To Action (§9) */
export function CallToAction() {
  return (
    <section className="relative isolate flex min-h-[495px] items-center overflow-hidden text-paper">
      <Media src="/media/cta.jpg" alt="Car driving at speed" />
      <div aria-hidden className="absolute inset-0 bg-ink/55" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-20 desktop:flex-row desktop:items-end desktop:justify-between">
        <h2 className="max-w-[620px] text-balance text-h2">
          Ready to Experience Your Dream Car?
        </h2>
        <div className="flex max-w-[420px] flex-col items-start gap-6">
          <p className="text-body-l text-paper-muted">
            Book a private test drive and feel what true performance means.
            Every vehicle available for immediate viewing.
          </p>
          <Button href="/contact" variant="secondary">
            Schedule Test Drive
          </Button>
        </div>
      </div>
    </section>
  );
}
