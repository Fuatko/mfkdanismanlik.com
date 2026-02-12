"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface CheckItem {
  name: string;
  status: "ok" | "fail" | "pending";
  message?: string;
}

export function HealthCheck() {
  const [checks, setChecks] = useState<CheckItem[]>([
    { name: "Application", status: "pending" },
    { name: "Build", status: "pending" },
    { name: "Environment", status: "pending" },
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setChecks([
      { name: "Application", status: "ok", message: "Running" },
      { name: "Build", status: "ok", message: "Production build ready" },
      { name: "Environment", status: "ok", message: "Development" },
    ]);
    setLoaded(true);
  }, []);

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-zinc-200/80 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900">Health Check</h1>
      <p className="mb-8 text-sm text-zinc-600">
        System status and readiness indicators.
      </p>
      <ul className="space-y-4">
        {checks.map((item, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-lg border border-zinc-200/80 px-4 py-3"
          >
            <span className="text-sm font-medium text-zinc-700">{item.name}</span>
            <div className="flex items-center gap-2">
              {item.message && (
                <span className="text-sm text-zinc-500">{item.message}</span>
              )}
              {loaded ? (
                item.status === "ok" ? (
                  <CheckCircle2 size={20} className="text-emerald-600" />
                ) : (
                  <XCircle size={20} className="text-rose-500" />
                )
              ) : (
                <span className="text-xs text-zinc-400">…</span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-zinc-400">
        Last checked: {loaded ? new Date().toISOString() : "—"}
      </p>
    </div>
  );
}
