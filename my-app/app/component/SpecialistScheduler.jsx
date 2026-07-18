'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * SpecialistScheduler
 * -------------------
 * Self-contained "Talk to a Specialist" CTA + booking modal for Next.js.
 * Single file: component + plain CSS (no CSS Modules — uses regular
 * class names via styled-jsx, which ships built into Next.js already,
 * so there's nothing extra to install or configure).
 *
 * Usage:
 *   import SpecialistScheduler from '@/components/SpecialistScheduler';
 *   <SpecialistScheduler
 *     specialistName="Dr. Elena Marsh"
 *     onConfirm={(booking) => fetch('/api/appointments', { method: 'POST', body: JSON.stringify(booking) })}
 *   />
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const TIME_SLOTS = [
  '9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM',
  '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM', '4:00 PM',
];

// Sundays closed, purely illustrative — wire this up to real availability.
function isDayAvailable(date) {
  const day = date.getDay();
  const isPast = stripTime(date) < stripTime(new Date());
  return day !== 0 && !isPast;
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a, b) {
  return !!a && !!b && stripTime(a).getTime() === stripTime(b).getTime();
}

function buildMonthGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function SpecialistScheduler({
  specialistName = 'a Wellness Specialist',
  ctaLabel = 'Talk to a Specialist',
  onConfirm,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('calendar'); // 'calendar' | 'details' | 'confirmed'
  const [visibleMonth, setVisibleMonth] = useState(() => stripTime(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);

  const weeks = useMemo(() => buildMonthGrid(visibleMonth), [visibleMonth]);
  const today = stripTime(new Date());
  const canGoBackAMonth =
    visibleMonth.getFullYear() > today.getFullYear() ||
    (visibleMonth.getFullYear() === today.getFullYear() && visibleMonth.getMonth() > today.getMonth());

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function openModal() {
    setIsOpen(true);
    setStep('calendar');
  }

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      setStep('calendar');
      setSelectedDate(null);
      setSelectedTime(null);
      setForm({ name: '', email: '', phone: '', notes: '' });
      setErrors({});
      setVisibleMonth(stripTime(new Date()));
    }, 200);
  }

  function changeMonth(delta) {
    setVisibleMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function pickDate(date) {
    if (!date || !isDayAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  }

  function proceedToDetails() {
    if (selectedDate && selectedTime) setStep('details');
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Enter a phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submitBooking(e) {
    e.preventDefault();
    if (!validate()) return;

    const booking = {
      date: selectedDate,
      time: selectedTime,
      specialist: specialistName,
      ...form,
    };

    onConfirm?.(booking);
    setStep('confirmed');
  }

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : '';

  return (
    <>
      <button type="button" className="scheduler-cta-btn" onClick={openModal}>
        {ctaLabel}
        <span className="scheduler-cta-arrow" aria-hidden="true">→</span>
      </button>

      {isOpen && (
        <div className="scheduler-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeModal()}>
          <div
            className="scheduler-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheduler-title"
            ref={dialogRef}
            tabIndex={-1}
          >
            <button type="button" className="scheduler-close-btn" onClick={closeModal} aria-label="Close scheduler">
              ×
            </button>

            <div className="scheduler-leaf-mark" aria-hidden="true" />

            {step === 'calendar' && (
              <div className="scheduler-grid">
                <div className="scheduler-calendar-pane">
                  <p className="scheduler-eyebrow">Schedule a Consultation</p>
                  <h2 id="scheduler-title" className="scheduler-title">
                    Find a time that suits you
                  </h2>

                  <div className="scheduler-month-nav">
                    <button
                      type="button"
                      className="scheduler-nav-btn"
                      onClick={() => changeMonth(-1)}
                      disabled={!canGoBackAMonth}
                      aria-label="Previous month"
                    >
                      ‹
                    </button>
                    <span className="scheduler-month-label">
                      {MONTH_NAMES[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
                    </span>
                    <button
                      type="button"
                      className="scheduler-nav-btn"
                      onClick={() => changeMonth(1)}
                      aria-label="Next month"
                    >
                      ›
                    </button>
                  </div>

                  <div className="scheduler-weekday-row">
                    {WEEKDAY_LABELS.map((w, i) => (
                      <span key={`${w}-${i}`} className="scheduler-weekday-cell">{w}</span>
                    ))}
                  </div>

                  <div className="scheduler-calendar-body">
                    {weeks.map((week, wi) => (
                      <div className="scheduler-week-row" key={wi}>
                        {week.map((date, di) => {
                          if (!date) return <span key={di} className="scheduler-day-cell-empty" />;
                          const available = isDayAvailable(date);
                          const selected = sameDay(date, selectedDate);
                          const isToday = sameDay(date, today);
                          return (
                            <button
                              type="button"
                              key={di}
                              disabled={!available}
                              onClick={() => pickDate(date)}
                              className={[
                                'scheduler-day-cell',
                                selected ? 'scheduler-day-cell-selected' : '',
                                !available ? 'scheduler-day-cell-disabled' : '',
                                isToday && !selected ? 'scheduler-day-cell-today' : '',
                              ].join(' ')}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="scheduler-slot-pane">
                  <p className="scheduler-slot-heading">
                    {selectedDate ? formattedDate : 'Select a date to see openings'}
                  </p>

                  <div className="scheduler-slot-list">
                    {selectedDate ? (
                      TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          className={[
                            'scheduler-slot-btn',
                            selectedTime === slot ? 'scheduler-slot-btn-selected' : '',
                          ].join(' ')}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <p className="scheduler-slot-empty-state">
                        Openings with {specialistName} will appear here once you choose a day.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="scheduler-primary-btn"
                    disabled={!selectedDate || !selectedTime}
                    onClick={proceedToDetails}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 'details' && (
              <form className="scheduler-details-pane" onSubmit={submitBooking}>
                <button type="button" className="scheduler-back-btn" onClick={() => setStep('calendar')}>
                  ‹ Back to calendar
                </button>

                <p className="scheduler-eyebrow">Confirm Your Details</p>
                <h2 className="scheduler-title">{formattedDate} · {selectedTime}</h2>
                <p className="scheduler-subcopy">With {specialistName}. We'll send a confirmation to your email.</p>

                <label className="scheduler-field">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jordan Blake"
                  />
                  {errors.name && <em className="scheduler-error-text">{errors.name}</em>}
                </label>

                <label className="scheduler-field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jordan@email.com"
                  />
                  {errors.email && <em className="scheduler-error-text">{errors.email}</em>}
                </label>

                <label className="scheduler-field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="(555) 010-0192"
                  />
                  {errors.phone && <em className="scheduler-error-text">{errors.phone}</em>}
                </label>

                <label className="scheduler-field">
                  <span>What would you like to discuss? (optional)</span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Share anything that will help us prepare."
                  />
                </label>

                <button type="submit" className="scheduler-primary-btn">
                  Confirm Appointment
                </button>
              </form>
            )}

            {step === 'confirmed' && (
              <div className="scheduler-confirm-pane">
                <div className="scheduler-confirm-mark" aria-hidden="true">✓</div>
                <p className="scheduler-eyebrow">You're Booked</p>
                <h2 className="scheduler-title">See you {formattedDate}</h2>
                <p className="scheduler-subcopy">
                  {selectedTime} with {specialistName}. A confirmation is on its way to {form.email}.
                </p>
                <button type="button" className="scheduler-primary-btn" onClick={closeModal}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        :root {
          --green-deep: #1a3a2a;
          --green-mid: #2d5a3d;
          --green-light: #4a8a5e;
          --green-pale: #c8dfd1;
          --green-frost: #eef5f0;
          --white: #f9faf8;
          --cream: #f4f0e8;
          --gold: #b8a070;
          --gold-light: #d4bc8a;
          --text-dark: #1a2420;
          --text-mid: #3d5044;
          --text-muted: #7a9080;
        }
      `}</style>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        /* ---------- CTA button ---------- */

        .scheduler-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.95rem 1.9rem;
          background: var(--green-deep);
          color: var(--cream);
          border: 1px solid var(--green-deep);
          border-radius: 2px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }

        .scheduler-cta-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--text-dark);
        }

        .scheduler-cta-btn:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }

        .scheduler-cta-arrow {
          transition: transform 0.25s ease;
        }

        .scheduler-cta-btn:hover .scheduler-cta-arrow {
          transform: translateX(3px);
        }

        /* ---------- Overlay & dialog shell ---------- */

        .scheduler-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 36, 32, 0.55);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          z-index: 1000;
          animation: schedulerFadeIn 0.2s ease;
        }

        .scheduler-dialog {
          position: relative;
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--white);
          border-radius: 4px;
          box-shadow: 0 24px 60px rgba(26, 58, 42, 0.35);
          padding: 2.5rem;
          outline: none;
          animation: schedulerRiseIn 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes schedulerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes schedulerRiseIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .scheduler-close-btn {
          position: absolute;
          top: 1.2rem;
          right: 1.4rem;
          width: 2.1rem;
          height: 2.1rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 1.6rem;
          line-height: 1;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .scheduler-close-btn:hover {
          background: var(--green-frost);
          color: var(--green-deep);
        }

        /* Signature element: a soft botanical mark, echoes the leaf-notch
           used for the selected calendar date, anchored quietly behind
           the header. */
        .scheduler-leaf-mark {
          position: absolute;
          top: -30px;
          left: -30px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle at 30% 30%, var(--green-pale) 0%, transparent 70%);
          border-radius: 50% 50% 50% 0;
          opacity: 0.6;
          pointer-events: none;
        }

        /* ---------- Shared typography ---------- */

        .scheduler-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 0.5rem;
        }

        .scheduler-title {
          font-family: 'Fraunces', serif;
          font-size: 1.65rem;
          font-weight: 500;
          color: var(--green-deep);
          margin: 0 0 1.4rem;
          line-height: 1.25;
        }

        .scheduler-subcopy {
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          color: var(--text-mid);
          margin: -0.8rem 0 1.6rem;
        }

        /* ---------- Calendar step ---------- */

        .scheduler-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 2.5rem;
        }

        @media (max-width: 640px) {
          .scheduler-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        .scheduler-month-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .scheduler-month-label {
          font-family: 'Fraunces', serif;
          font-size: 1rem;
          color: var(--text-dark);
        }

        .scheduler-nav-btn {
          width: 2rem;
          height: 2rem;
          border: 1px solid var(--green-pale);
          background: var(--white);
          color: var(--green-mid);
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .scheduler-nav-btn:hover:not(:disabled) {
          background: var(--green-frost);
          border-color: var(--green-light);
        }

        .scheduler-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .scheduler-weekday-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 0.35rem;
        }

        .scheduler-weekday-cell {
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .scheduler-week-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 0.3rem;
        }

        .scheduler-day-cell-empty {
          height: 2.4rem;
        }

        .scheduler-day-cell {
          height: 2.4rem;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-dark);
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s ease, color 0.2s ease, border-radius 0.25s ease;
        }

        .scheduler-day-cell:hover:not(:disabled) {
          background: var(--green-frost);
        }

        .scheduler-day-cell-today {
          color: var(--green-mid);
          font-weight: 600;
          box-shadow: inset 0 0 0 1px var(--green-pale);
        }

        .scheduler-day-cell-selected {
          background: var(--gold);
          color: var(--white);
          font-weight: 600;
          /* leaf-notch echo of .scheduler-leaf-mark, this project's signature shape */
          border-radius: 50% 50% 50% 0;
        }

        .scheduler-day-cell-disabled {
          color: var(--green-pale);
          cursor: not-allowed;
        }

        /* ---------- Slot pane ---------- */

        .scheduler-slot-pane {
          border-left: 1px solid var(--green-frost);
          padding-left: 2.5rem;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .scheduler-slot-pane {
            border-left: none;
            border-top: 1px solid var(--green-frost);
            padding-left: 0;
            padding-top: 1.75rem;
          }
        }

        .scheduler-slot-heading {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem;
          color: var(--green-deep);
          margin: 0 0 1rem;
        }

        .scheduler-slot-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .scheduler-slot-empty-state {
          grid-column: 1 / -1;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .scheduler-slot-btn {
          padding: 0.65rem 0.5rem;
          border: 1px solid var(--green-pale);
          background: var(--white);
          color: var(--text-mid);
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          border-radius: 2px;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .scheduler-slot-btn:hover {
          border-color: var(--green-light);
        }

        .scheduler-slot-btn-selected {
          background: var(--green-deep);
          border-color: var(--green-deep);
          color: var(--cream);
        }

        /* ---------- Buttons ---------- */

        .scheduler-primary-btn {
          width: 100%;
          padding: 0.85rem;
          background: var(--green-deep);
          color: var(--cream);
          border: none;
          border-radius: 2px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .scheduler-primary-btn:hover:not(:disabled) {
          background: var(--green-mid);
        }

        .scheduler-primary-btn:disabled {
          background: var(--green-pale);
          cursor: not-allowed;
        }

        .scheduler-back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1.2rem;
        }

        .scheduler-back-btn:hover {
          color: var(--green-mid);
        }

        /* ---------- Details step ---------- */

        .scheduler-details-pane {
          display: flex;
          flex-direction: column;
          max-width: 480px;
        }

        .scheduler-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: var(--text-mid);
        }

        .scheduler-field input,
        .scheduler-field textarea {
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          color: var(--text-dark);
          padding: 0.7rem 0.85rem;
          border: 1px solid var(--green-pale);
          border-radius: 2px;
          background: var(--green-frost);
          resize: vertical;
        }

        .scheduler-field input:focus,
        .scheduler-field textarea:focus {
          outline: none;
          border-color: var(--gold);
          background: var(--white);
        }

        .scheduler-error-text {
          color: #a5493a;
          font-size: 0.76rem;
          font-style: normal;
        }

        /* ---------- Confirmed step ---------- */

        .scheduler-confirm-pane {
          text-align: center;
          padding: 1.5rem 0 0.5rem;
        }

        .scheduler-confirm-mark {
          width: 3.4rem;
          height: 3.4rem;
          margin: 0 auto 1.4rem;
          border-radius: 50% 50% 50% 0;
          background: var(--gold);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
      `}</style>
    </>
  );
}
