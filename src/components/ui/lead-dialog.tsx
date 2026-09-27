"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { FilterInput } from "@/components/ui/filter-field";
import { FormButton, type FormButtonState } from "@/components/ui/form-button";
import { submitLead } from "@/lib/lead";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/messenger-icons";
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
                ? "Спасибо! Мы свяжемся с вами в рабочее время."
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
                Я ознакомлен(-а) с{" "}
                <Link href="/privacy" target="_blank" className={legalLink}>
                  Политикой обработки персональных данных
                </Link>{" "}
                и даю согласие на обработку моих персональных данных
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
