"use client"

import { useEffect, useState } from "react"
import { getCountdownDate } from "@/actions/admin-actions"

export function CountdownTimer() {
  const [targetDate, setTargetDate] = useState<number | null>(null)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Fetch target date
  useEffect(() => {
    getCountdownDate().then((dateStr) => {
      const t = dateStr ? new Date(dateStr).getTime() : new Date("2026-01-19T21:00:00-08:00").getTime()
      setTargetDate(t)
    })
  }, [])

  const calculateTimeLeft = () => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  // Timer effect
  useEffect(() => {
    if (!targetDate) return

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <section className="flex-shrink-0 bg-brand text-brand-foreground py-3">
      <div className="flex items-center justify-center gap-4 text-center">
        <span className="text-sm font-medium tracking-wide mr-2">Sale Ends:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.days)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Days</span>
        </div>
        <span className="text-xl opacity-40">:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.hours)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Hours</span>
        </div>
        <span className="text-xl opacity-40">:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.minutes)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Min</span>
        </div>
        <span className="text-xl opacity-40">:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.seconds)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Sec</span>
        </div>
      </div>
    </section>
  )
}
