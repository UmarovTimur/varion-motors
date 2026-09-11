"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { FilterInput } from "@/components/ui/filter-field";
import { FormButton, type FormButtonState } from "@/components/ui/form-button";
import { submitLead } from "@/lib/lead";
import { site } from "@/lib/site";
import { cn, typo } from "@/lib/utils";

/**
 * Lead dialog — "Узнайте стоимость". Mounted once in the root layout.
 *
 * Any element carrying `data-lead` opens it instead of following its link, so
 * the CTAs keep `href="/contact"` as the no-JS fallback and a ctrl/cmd-click
 * still opens the contact page in a new tab. `data-lead="<car name>"` pre-fills
 * the "Какое авто" field (used on the vehicle page).
 */
export function LeadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormButtonState>("idle");
  const [car, setCar] = useState("");

  useEffect(() => {
    // Capture phase on document runs before React's handlers on the root, and
    // next/link skips navigation for an event that is already defaultPrevented.
    // Propagation is left alone so the trigger's own onClick still runs.
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const trigger = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-lead]",
      );
      if (!trigger) return;
      e.preventDefault();
      const preset = trigger.dataset.lead;
      if (preset) setCar(preset);
      setState((s) => (s === "success" ? "idle" : s));
      ref.current?.showModal();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  function close() {
    ref.current?.close();
  }

  function onClosed() {
    // A sent form starts clean next time; an unsent one keeps what was typed.
    if (state === "success") {
      formRef.current?.reset();
      setCar("");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Honeypot: bots fill every field, people never see this one.
    if (data.get("website")) return setState("success");

    setState("loading");
    try {
      await submitLead({
        name: String(data.get("name") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        car: String(data.get("car") ?? "").trim(),
        budget: String(data.get("budget") ?? "").trim(),
        page: window.location.pathname,
      });
      setState("success");
    } catch {
      setState("error");
    }
  }

  const sent = state === "success";

  return (
    <dialog
      ref={ref}
      aria-labelledby="lead-title"
      onClose={onClosed}
      // A click that lands on the <dialog> itself is a click on the backdrop.
      onClick={(e) => e.target === e.currentTarget && close()}
      className={cn(
        "m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[480px] overflow-y-auto overscroll-contain rounded-lg bg-background p-0 text-ink",
        "backdrop:bg-black/60 backdrop:backdrop-blur-[2px]",
        "translate-y-3 opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-(--dur-base) ease-out",
        "open:translate-y-0 open:opacity-100 starting:open:translate-y-3 starting:open:opacity-0",
      )}
    >
      <div className="relative flex flex-col gap-6 px-5 pt-12 pb-6 tablet:px-10 tablet:pt-14 tablet:pb-8">
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-sm text-ink-muted transition-colors duration-(--dur-fast) hover:bg-background-light hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
        >
          <X className="size-6" strokeWidth={1.5} aria-hidden />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="lead-title" className="text-h3 font-bold">
            {sent ? "Заявка отправлена" : "Узнайте стоимость"}
          </h2>
          <p className="max-w-[360px] text-balance text-body text-ink-muted">
            {typo(
              sent
                ? "Спасибо! Мы свяжемся с вами в течение [XX] часов."
                : "Ответьте на вопросы, и мы свяжемся с вами",
            )}
          </p>
          <span aria-hidden className="mt-1 h-px w-2/3 bg-grey" />
        </div>

        {/* Messengers */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={site.telegram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Написать в Telegram"
            className="grid h-[54px] place-items-center rounded-btn bg-telegram text-paper transition-opacity duration-(--dur-fast) hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <TelegramIcon className="size-7" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Написать в WhatsApp"
            className="grid h-[54px] place-items-center rounded-btn bg-whatsapp text-paper transition-opacity duration-(--dur-fast) hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <WhatsAppIcon className="size-7" />
          </a>
        </div>

        {sent ? (
          <FormButton type="button" onClick={close} className="w-full">
            Закрыть
          </FormButton>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col gap-3"
          >
            <FilterInput
              name="name"
              required
              autoComplete="name"
              placeholder="Ваше имя"
              aria-label="Ваше имя"
              className={field}
            />
            <FilterInput
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="Ваш номер телефона"
              aria-label="Ваш номер телефона"
              pattern="[+0-9()\s\-]{7,}"
              title="Номер телефона, например +998 90 123 45 67"
              className={field}
            />
            <FilterInput
              name="car"
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="Какое авто вы рассматриваете?"
              aria-label="Какое авто вы рассматриваете?"
              className={field}
            />
            <FilterInput
              name="budget"
              placeholder="Примерный бюджет"
              aria-label="Примерный бюджет"
              className={field}
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute size-0 opacity-0"
            />

            <FormButton
              state={state === "error" ? "idle" : state}
              className="mt-2 w-full"
            >
              Отправить
            </FormButton>
            {state === "error" ? (
              <p role="alert" className="text-center text-body-xs text-ink">
                Не получилось отправить. Попробуйте ещё раз или напишите нам в
                Telegram.
              </p>
            ) : null}

            <label className="mt-1 flex cursor-pointer items-start gap-3 text-body-xs text-ink-subtle">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-5 shrink-0 cursor-pointer accent-ink"
              />
              <span>
                Я ознакомлен(-а) и соглашаюсь с{" "}
                <Link href="/privacy" target="_blank" className={legalLink}>
                  политикой конфиденциальности
                </Link>{" "}
                и даю согласие на{" "}
                <Link href="/privacy" target="_blank" className={legalLink}>
                  обработку персональных данных
                </Link>
              </span>
            </label>
          </form>
        )}
      </div>
    </dialog>
  );
}

/** White fields on the grey card, as in Framer's contact form. */
const field = "bg-background-light text-ink placeholder:text-ink-subtle";

const legalLink =
  "text-ink-muted underline underline-offset-2 hover:text-ink";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="4.6 6.6 13.4 12"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
