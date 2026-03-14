"use client";

import { useState, useMemo } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { buttonVariants } from "@/components/ui/button";
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

  return (
    <SectionWrapper id={SECTION_IDS.calculator}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Mortgage Calculator
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Estimate your monthly payment in seconds
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-xl border border-border bg-card p-4 shadow-sm sm:mt-12 sm:p-6 md:p-8">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="loan-amount"
              className="block text-sm font-medium text-foreground"
            >
              Loan Amount
            </label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="loan-amount"
                type="text"
                inputMode="numeric"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value.replace(/[^0-9,]/g, ""))}
                onBlur={() => setLoanAmount(formatWithCommas(loanAmount))}
                className="h-10 w-full rounded-lg border border-input bg-background pl-7 pr-3 text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="interest-rate"
              className="block text-sm font-medium text-foreground"
            >
              Interest Rate
            </label>
            <div className="relative mt-1.5">
              <input
                id="interest-rate"
                type="text"
                inputMode="decimal"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))
                }
                className="h-10 w-full rounded-lg border border-input bg-background pl-3 pr-8 text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                %
              </span>
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-foreground">
              Loan Term
            </span>
            <div className="mt-1.5 flex gap-2 sm:gap-3">
              {([30, 15] as const).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTerm(term)}
                  className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    loanTerm === term
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {term} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-secondary p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Estimated Monthly Payment
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {monthlyPayment > 0 ? formatCurrency(monthlyPayment) : "--"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Principal &amp; Interest
          </p>
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
          This calculator provides estimates only and does not constitute a
          commitment to lend. Actual rates, payments, and terms may vary.
          Contact me for a personalized quote.
        </p>

        <div className="mt-5 text-center">
          <a
            href="#contact"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            Get Your Personalized Rate
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
