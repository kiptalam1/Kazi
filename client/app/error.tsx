'use client';

import { getApiErrorMessage } from "@/lib/api/error";

export default function QueryError({ error }: { error: unknown }) {
  return (
    <p className="text-center text-sm text-danger p-6">{getApiErrorMessage(error)}</p>

  )
}

