import { useEffect, useState } from "react";
import { BUSINESS } from "../data/business";

interface Status {
  open: boolean;
  nextLabel: string; // e.g. "14:00"
  nextType: "closes" | "reopens" | "opens";
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fmt = (hhmm: string, isAr: boolean) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? (isAr ? "م" : "PM") : (isAr ? "ص" : "AM");
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

export function useOpenStatus(isAr: boolean): Status {
  const compute = (): Status => {
    // UAE time (UTC+4)
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const uae = new Date(utc + 4 * 3600000);
    const day = uae.getDay(); // 5 = Friday
    const mins = uae.getHours() * 60 + uae.getMinutes();
    const shifts = day === 5 ? BUSINESS.fridayHours : BUSINESS.hours;

    for (let i = 0; i < shifts.length; i++) {
      const s = shifts[i];
      if (mins >= toMin(s.open) && mins < toMin(s.close)) {
        return { open: true, nextLabel: fmt(s.close, isAr), nextType: "closes" };
      }
    }
    for (let i = 0; i < shifts.length; i++) {
      const s = shifts[i];
      if (mins < toMin(s.open)) {
        return { open: false, nextLabel: fmt(s.open, isAr), nextType: i === 0 ? "opens" : "reopens" };
      }
    }
    const tomorrowShifts = (day + 1) % 7 === 5 ? BUSINESS.fridayHours : BUSINESS.hours;
    return { open: false, nextLabel: fmt(tomorrowShifts[0].open, isAr), nextType: "opens" };
  };

  const [status, setStatus] = useState<Status>(compute);
  useEffect(() => {
    setStatus(compute());
    const id = setInterval(() => setStatus(compute()), 60000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAr]);
  return status;
}
