'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  MapPin,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Loader from './loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.data) {
      router.replace('/jobs');
    }
  }, [router, user]);

  if (isPending || user?.data) {
    return <Loader />;
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Kazi home" className="shrink-0">
          <Image
            src="/logo.png"
            width={108}
            height={39}
            alt="Kazi"
            priority
            className="h-auto w-auto"
          />
        </Link>
        <nav className="text-text-secondary hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            className="hover:text-text-primary transition-colors"
            href="/jobs"
          >
            Find jobs
          </Link>
          <Link
            className="hover:text-text-primary transition-colors"
            href="/register"
          >
            For employers
          </Link>
          <Link
            className="hover:text-text-primary transition-colors"
            href="/login"
          >
            Sign in
          </Link>
        </nav>
        <Link
          href="/register"
          className="bg-brand-primary text-text-inverse hover:bg-brand-hover focus:ring-brand-primary rounded-md px-4 py-2.5 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Get started
        </Link>
      </header>

      <main>
        <section className="border-border-muted bg-background-muted relative overflow-hidden border-y">
          <div className="bg-accent-soft pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-selection pointer-events-none absolute -bottom-44 -left-20 h-80 w-80 rounded-full blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-32">
            <div className="animate-emerge">
              <div className="border-border bg-background text-brand-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase">
                <Sparkles size={14} aria-hidden="true" />
                Work that moves you forward
              </div>
              <h1 className="text-text-primary max-w-3xl text-5xl leading-[0.98] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Your next chapter starts with the right{' '}
                <span className="text-brand-primary">opportunity.</span>
              </h1>
              <p className="text-text-secondary mt-7 max-w-xl text-lg leading-8">
                Kazi connects ambitious people with teams building what matters.
                Find a role that fits your skills, goals, and the way you want
                to work.
              </p>
              <form
                action="/jobs"
                className="border-border bg-background mt-9 flex max-w-2xl flex-col gap-3 rounded-xl border p-2 shadow-[0_14px_40px_-20px_rgba(16,24,40,0.3)] sm:flex-row"
              >
                <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search
                    className="text-text-muted shrink-0"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="sr-only">Search roles</span>
                  <input
                    name="q"
                    className="text-text-primary placeholder:text-text-muted min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
                    placeholder="Job title, skill, or keyword"
                  />
                </label>
                <label className="border-border-muted flex min-w-0 flex-1 items-center gap-3 border-t px-3 sm:border-t-0 sm:border-l sm:pl-4">
                  <MapPin
                    className="text-text-muted shrink-0"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="sr-only">Search location</span>
                  <input
                    name="location"
                    className="text-text-primary placeholder:text-text-muted min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
                    placeholder="Location or remote"
                  />
                </label>
                <button
                  className="bg-brand-primary text-text-inverse hover:bg-brand-hover focus:ring-brand-primary flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  type="submit"
                >
                  Search jobs
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </form>
              <div className="text-text-muted mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span>Popular:</span>
                <Link
                  className="text-text-secondary hover:text-brand-primary font-medium"
                  href="/jobs?q=engineering"
                >
                  Engineering
                </Link>
                <Link
                  className="text-text-secondary hover:text-brand-primary font-medium"
                  href="/jobs?q=design"
                >
                  Design
                </Link>
                <Link
                  className="text-text-secondary hover:text-brand-primary font-medium"
                  href="/jobs?q=marketing"
                >
                  Marketing
                </Link>
              </div>
            </div>

            <div
              className="relative hidden lg:block"
              aria-label="Kazi job marketplace overview"
            >
              <div className="border-border bg-background absolute top-8 -left-9 z-10 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg">
                <span className="bg-accent-soft text-accent-content flex h-9 w-9 items-center justify-center rounded-full">
                  <BriefcaseBusiness size={18} />
                </span>
                <div>
                  <p className="text-text-muted text-xs">New roles today</p>
                  <p className="text-text-primary font-semibold">
                    1,240+ openings
                  </p>
                </div>
              </div>
              <div className="border-border bg-background ml-auto max-w-sm rounded-2xl border p-6 shadow-[0_24px_60px_-24px_rgba(16,24,40,0.35)]">
                <div className="border-border-muted flex items-center justify-between border-b pb-5">
                  <div>
                    <p className="text-text-muted text-xs font-medium">
                      Recommended for you
                    </p>
                    <h2 className="text-text-primary mt-1 text-xl font-semibold">
                      Product Designer
                    </h2>
                  </div>
                  <span className="bg-selection text-brand-primary rounded-md px-2 py-1 text-xs font-semibold">
                    New
                  </span>
                </div>
                <div className="py-5">
                  <p className="text-text-secondary font-medium">
                    Northstar Labs
                  </p>
                  <p className="text-text-muted mt-1 text-sm">
                    Nairobi · Hybrid
                  </p>
                  <div className="mt-5 flex gap-2">
                    <span className="bg-background-subtle text-text-secondary rounded px-2 py-1 text-xs">
                      Full-time
                    </span>
                    <span className="bg-background-subtle text-text-secondary rounded px-2 py-1 text-xs">
                      Mid-level
                    </span>
                  </div>
                </div>
                <div className="border-border-muted flex items-center justify-between border-t pt-4">
                  <span className="text-text-primary text-sm font-semibold">
                    KES 180k–240k
                  </span>
                  <ArrowRight
                    className="text-brand-primary"
                    size={19}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="border-border bg-background absolute -bottom-8 -left-14 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg">
                <span className="bg-selection text-brand-primary flex h-9 w-9 items-center justify-center rounded-full">
                  <Users size={18} />
                </span>
                <div>
                  <p className="text-text-muted text-xs">
                    People finding their fit
                  </p>
                  <p className="text-text-primary font-semibold">
                    18,000+ members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="border-border flex flex-col justify-between gap-5 border-b pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-brand-primary text-sm font-semibold tracking-[0.14em] uppercase">
                A better way to look
              </p>
              <h2 className="text-text-primary mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Find work that fits your life.
              </h2>
            </div>
            <Link
              className="text-brand-primary hover:text-brand-hover inline-flex items-center gap-2 text-sm font-semibold"
              href="/jobs"
            >
              Explore all jobs <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-10 pt-10 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Search with intention',
                copy: 'Cut through the noise with roles shaped around what you actually want next.',
              },
              {
                number: '02',
                title: 'Show your real value',
                copy: 'Build a profile that gives great teams a clear view of how you can contribute.',
              },
              {
                number: '03',
                title: 'Make your move',
                copy: 'Apply with confidence and keep every opportunity in one focused place.',
              },
            ].map((item) => (
              <div
                key={item.number}
                className="border-brand-primary border-t-2 pt-5"
              >
                <span className="text-accent-active text-sm font-semibold">
                  {item.number}
                </span>
                <h3 className="text-text-primary mt-6 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-text-secondary mt-3 leading-7">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-border bg-text-primary text-text-inverse border-t">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-20">
            <div>
              <p className="text-accent text-sm font-semibold tracking-[0.14em] uppercase">
                For growing teams
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                The right person can change everything.
              </h2>
              <p className="text-text-inverse/70 mt-4 max-w-xl leading-7">
                Share your next role with people who are ready to do meaningful
                work. Build your team with Kazi.
              </p>
            </div>
            <Link
              href="/register"
              className="bg-accent text-text-primary hover:bg-accent-hover inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition-colors"
            >
              Post a job <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="text-text-muted mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={60}
            height={26}
            alt="Kazi"
            className="h-auto w-auto"
          />
          <span className="text-base">Work, with purpose.</span>
        </div>
        <div className="flex gap-5">
          <Link href="/jobs" className="hover:text-text-primary">
            Browse jobs
          </Link>
          <Link href="/login" className="hover:text-text-primary">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
