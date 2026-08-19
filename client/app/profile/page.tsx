'use client';
import { Avatar } from '@/components/ui/Avatar';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api/error';

export default function ProfilePage() {
  const { data, isPending, isError, error } = useAuth();

  if (isPending) {
    return (
      <div className="flex items-center justify-center  min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mx-auto p-6">{getApiErrorMessage(error)}</p>
    );
  }

  const user = data.data;
  const candidate = user.candidate;

  const profileLinks = [
    {
      name: 'GitHub',
      value: 'githubUrl',
    },
    {
      name: 'LinkedIn',
      value: 'linkedinUrl',
    },
    {
      name: 'Portfolio',
      value: 'portfolioUrl',
    },
  ] as const;

  return (
    <main className="p-4 sm:py-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
      <section className="flex items-center gap-4 border border-border-muted p-4 sm:p-6 md:p-8">
        {user.avatar ? (
          <Avatar
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            width={80}
            height={80}
          />
        ) : (
          <FallbackAvatar value={user.firstName} className="size-20" />
        )}
        <div className="text-sm text-text-secondary">
          <h1 className="text-lg font-semibold text-text-primary">
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.email}</p>
          <p>{user.phone ?? 'No phone'}</p>
        </div>
      </section>
      {candidate && (
        <>
          <section className=" border border-border-muted p-4 sm:p-6 md:p-8">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
              Professional Information
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-text-muted text-xs">Headline</p>
                  <p>{candidate.headline ?? 'No headline'}</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs whitespace-pre-wrap">
                    Bio
                  </p>
                  <p className="mt-1">{candidate.bio ?? 'No bio'}</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-text-muted text-xs">Current Job Title</p>
                  <p className="mt-1">
                    {candidate.currentJobTitle ?? 'No job title'}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Location</p>
                  <p className="mt-1">{candidate.location ?? 'No location'}</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Experience Level</p>
                  <p className="mt-1">
                    {candidate.experienceLevel ?? 'Add experience level'}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Availability</p>
                  <p className="mt-1">
                    {candidate.availability ?? 'Available'}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Skills</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {candidate.skills.length > 0 ? (
                      candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-background-muted px-2 py-1 text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p>No skills</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* links */}
          <section className="border border-border-muted p-4 sm:p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {profileLinks.map((link) => {
                const url = candidate[link.value];
                return (
                  <div key={link.value}>
                    <p className="text-xs text-text-muted">{link.name}</p>

                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {url}
                      </a>
                    ) : (
                      <p className="text-sm text-text-muted">Empty</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
