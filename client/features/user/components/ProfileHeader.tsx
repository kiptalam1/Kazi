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
      <div className="w-full flex items-center justify-center  min-h-[50vh]">
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

  return (
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
  );
}
