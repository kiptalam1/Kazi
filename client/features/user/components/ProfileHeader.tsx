import { useAuth } from '@/features/auth/hooks/useAuth';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useUploadAvatar } from '../hooks/useUploadAvatar';
import Spinner from '@/components/ui/Spinner';
import { getApiErrorMessage } from '@/lib/api/error';
import { Avatar } from '@/components/ui/Avatar';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import { UserPlus } from 'lucide-react';

export default function ProfileHeader() {
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
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mx-auto p-6 text-center">{getApiErrorMessage(error)}</p>
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

  return (
    <section className="border-border-muted flex items-center gap-4 border p-4 sm:p-6 md:p-8">
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
            className="transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <FallbackAvatar value={user.firstName} className="size-20" />
        )}
        {isUploadPending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
            <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        <button
          type="button"
          aria-label="Update avatar"
          onClick={() => inputRef.current?.click()}
          disabled={isUploadPending}
          className="bg-background text-text-secondary hover:bg-background transistion-all absolute right-0 bottom-0 rounded-full p-1 duration-100 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="text-text-secondary text-sm">
        <h1 className="text-text-primary text-lg font-semibold">
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
        <p>{user.phone ?? 'No phone'}</p>
      </div>
    </section>
  );
}
