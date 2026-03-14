"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatWithCommas(value: string): string {
  const num = value.replace(/[^0-9]/g, "");
  if (!num) return "";
  return Number(num).toLocaleString("en-US");
}

function stripNonNumeric(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate === 0) return principal / (years * 12);

  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  const factor = Math.pow(1 + monthlyRate, totalPayments);

  return (principal * (monthlyRate * factor)) / (factor - 1);
}

export function CalculatorSection() {
  const [loanAmount, setLoanAmount] = useState("300,000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState<15 | 30>(30);

  const monthlyPayment = useMemo(() => {
    const principal = stripNonNumeric(loanAmount);
    const rate = parseFloat(interestRate) || 0;
    return calculateMonthlyPayment(principal, rate, loanTerm);
  }, [loanAmount, interestRate, loanTerm]);

  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - stripNonNumeric(loanAmount);

  return (
    <SectionWrapper id={SECTION_IDS.calculator}>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          Estimate
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Mortgage Calculator
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Estimate your monthly payment in seconds
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl ring-1 ring-border sm:mt-12"
      >
        <div className="md:grid md:grid-cols-5">
          {/* Input panel */}
          <div className="bg-card p-5 sm:p-6 md:col-span-3 md:p-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="loan-amount"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Loan Amount
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <input
                    id="loan-amount"
                    type="text"
                    inputMode="numeric"
                    value={loanAmount}
                    onChange={(e) =>
                      setLoanAmount(e.target.value.replace(/[^0-9,]/g, ""))
                    }
                    onBlur={() => setLoanAmount(formatWithCommas(loanAmount))}
                    className="h-12 w-full rounded-xl border border-input bg-background pl-8 pr-4 text-lg font-medium text-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="interest-rate"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Interest Rate
                </label>
                <div className="relative mt-2">
                  <input
                    id="interest-rate"
                    type="text"
                    inputMode="decimal"
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                    className="h-12 w-full rounded-xl border border-input bg-background pl-4 pr-10 text-lg font-medium text-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Loan Term
                </span>
                <div className="mt-2 flex gap-2 sm:gap-3">
                  {([30, 15] as const).map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTerm(term)}
                      className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        loanTerm === term
                          ? "border-gold-500 bg-gold-500 text-navy-950 shadow-sm"
                          : "border-input bg-background text-foreground hover:border-gold-500/40 hover:bg-gold-50"
                      }`}
                    >
                      {term} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className="relative overflow-hidden bg-navy-900 p-5 sm:p-6 md:col-span-2 md:flex md:flex-col md:justify-center md:p-8">
            {/* Dot grid pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, oklch(0.72 0.15 70) 0.5px, transparent 0.5px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Monthly Payment
              </p>
              <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                {monthlyPayment > 0 ? formatCurrency(monthlyPayment) : "--"}
              </p>
              <p className="mt-1 text-xs text-navy-400">
                Principal &amp; Interest
              </p>

              {/* Breakdown */}
              {monthlyPayment > 0 && (
                <div className="mt-5 space-y-2 border-t border-navy-700/50 pt-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-navy-400">Total Interest</span>
                    <span className="font-medium text-navy-200">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-navy-400">Total Cost</span>
                    <span className="font-medium text-navy-200">
                      {formatCurrency(totalPayment)}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-5 h-px w-8 mx-auto bg-gold-500/40" />

              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
              >
                Get Your Rate
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-3.5 w-3.5"
                >
                  <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
        This calculator provides estimates only and does not constitute a
        commitment to lend. Actual rates, payments, and terms may vary.
        Contact me for a personalized quote.
      </p>
    </SectionWrapper>
  );
}
