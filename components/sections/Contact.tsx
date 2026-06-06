"use client"

import { useState } from "react"
import { submitContact, type ContactResult } from "@/app/actions/contact"
import { RevealWrapper } from "@/components/RevealWrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const GOALS = [
  "First marathon",
  "Marathon PR / Boston qualifier",
  "First Ironman / 70.3",
  "Ironman PR / Kona qualifier",
  "Getting back into endurance",
]

const chips = ["hello@singamacademy.com", "Sivagangai · Worldwide (remote)"]

export function Contact() {
  const [result, setResult] = useState<ContactResult | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const data = new FormData(e.currentTarget)
    const res = await submitContact(data)
    setResult(res)
    setPending(false)
  }

  const sent = result?.success === true

  return (
    <section id="contact" className="py-[130px]">
      <div className="wrap">
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-[70px] items-center">

          {/* Copy */}
          <RevealWrapper>
            <p className="eyebrow">Start the conversation</p>
            <h2
              className="font-display mt-4"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 0.88 }}
            >
              Find your
              <br />
              finish line.
            </h2>
            <p className="text-muted text-[17px] mt-[22px] max-w-[420px]">
              Tell us your race and timeline. We&apos;ll send a free plan
              recommendation and book a 20-minute call — no pressure, no spam.
            </p>
            <div className="flex flex-wrap gap-[10px] mt-7">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="text-[12px] font-bold uppercase tracking-[0.06em] text-fg px-[15px] py-[9px] border border-line bg-bg"
                >
                  {chip}
                </span>
              ))}
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper delay={70}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[14px]"
              noValidate
            >
              {/* Full name */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  Full name
                </Label>
                <Input
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={sent}
                  className="bg-bg-2 border-line text-fg placeholder:text-faint text-[15px] h-auto px-4 py-[15px] rounded-none focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                  disabled={sent}
                  className="bg-bg-2 border-line text-fg placeholder:text-faint text-[15px] h-auto px-4 py-[15px] rounded-none focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>

              {/* Training goal */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  What are you training for?
                </Label>
                <Select name="goal" defaultValue={GOALS[0]} disabled={sent}>
                  <SelectTrigger className="bg-bg-2 border-line text-fg text-[15px] h-auto py-[15px] rounded-none focus:ring-0 focus:ring-offset-0 focus:border-accent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-2 border-line rounded-none">
                    {GOALS.map((g) => (
                      <SelectItem
                        key={g}
                        value={g}
                        className="text-fg focus:bg-bg focus:text-accent"
                      >
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-[7px]">
                <Label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  Anything we should know? (optional)
                </Label>
                <Textarea
                  name="msg"
                  rows={3}
                  placeholder="Race date, current weekly volume, injuries…"
                  disabled={sent}
                  className="bg-bg-2 border-line text-fg placeholder:text-faint text-[15px] px-4 py-[15px] rounded-none resize-none focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={pending || sent}
                className={cn(
                  "mt-1.5 inline-flex items-center justify-center",
                  "bg-accent text-ink text-[14px] font-extrabold uppercase tracking-[0.08em]",
                  "px-[34px] py-[18px] border-2 border-transparent",
                  "transition-all duration-200",
                  "hover:bg-fg hover:text-black hover:-translate-y-0.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                )}
              >
                {sent ? "Sent ✓" : pending ? "Sending…" : "Send & book my call"}
              </button>

              <p className="text-[12px] text-faint uppercase tracking-[0.06em]">
                We reply within one business day.
              </p>

              {sent && (
                <p className="text-accent text-[14px] font-bold">
                  ✓ Request received — check your inbox shortly.
                </p>
              )}
              {result && !result.success && (
                <p className="text-accent text-[14px] font-bold">
                  {result.error}
                </p>
              )}
            </form>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
