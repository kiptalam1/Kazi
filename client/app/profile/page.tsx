'use client';
import { Avatar } from '@/components/ui/Avatar';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useUploadAvatar } from '@/features/user/hooks/useUploadAvatar';
import { getApiErrorMessage } from '@/lib/api/error';
import { UserPlus } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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

export default function ProfilePage() {
  const { data, isPending, isError, error } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending: isUploadPending } = useUploadAvatar();

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

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

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const newFile = event.target.files?.[0];
    if (!newFile) return;
    const previewUrl = URL.createObjectURL(newFile);

    setAvatarPreview(previewUrl);

    const fd = new FormData();
    fd.append('avatar', newFile);

    upload(fd);
  }

  const user = data.data;
  const candidate = user.candidate;

  return (
    <main className="p-4 sm:py-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
      <section className="flex items-center gap-4 border border-border-muted p-4 sm:p-6 md:p-8">
        <div className="relative">
          {avatarPreview ? (
            <Avatar
              src={avatarPreview}
              alt={`${user.firstName} ${user.lastName}`}
              width={80}
              height={80}
            />
          ) : user.avatar ? (
            <Avatar
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              width={80}
              height={80}
              loading="eager"
              className="hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <FallbackAvatar value={user.firstName} className="size-20" />
          )}
          {isUploadPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <span className="size-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
            </div>
          )}
          <button
            type="button"
            aria-label="Update avatar"
            onClick={() => inputRef.current?.click()}
            disabled={isUploadPending}
            className="p-1 rounded-full bg-background absolute bottom-0 right-0 text-text-secondary hover:bg-background hover:scale-105 transistion-all duration-100  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="size-5" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            id="avatar"
            name="avatar"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
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
