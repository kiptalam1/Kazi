'use client';

import { getApiErrorMessage } from '@/lib/api/error';

export default function QueryError({ error }: { error: unknown }) {
  return (
    <p className="text-danger p-6 text-center text-sm">
      {getApiErrorMessage(error)}
    </p>
  );
}
