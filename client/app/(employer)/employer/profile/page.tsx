'use client';
import QueryError from '@/app/error';
import Loader from '@/app/loading';
import { Avatar } from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import useMyCompany from '@/features/employer/hooks/useMyCompany';
import formattedDate from '@/lib/utils/formattedDate';
import Link from 'next/link';

export default function EmployerProfilePage() {
  const { data: company, isPending, isError, error } = useMyCompany();

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  return (
    <div>
      {company ? (
        <div className="space-y-4">
          <section className="border-border space-y-2 border p-4">
            {company.logoUrl ? (
              <div className="bg-background-muted relative h-20 w-full border">
                <Avatar
                  src={company.logoUrl}
                  alt={company.name}
                  className="border-background absolute bottom-0 left-2 size-16 rounded-md border-4"
                  height={64}
                  width={64}
                />
              </div>
            ) : (
              <div className="bg-background-muted relative h-20 w-full">
                <FallbackAvatar
                  value={company.name}
                  className="border-background absolute bottom-0 left-2 size-16 rounded-md border-4"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold sm:text-2xl">{company.name}</h1>
              {company.companyMembers.map((memb) => (
                <Badge key={memb.id}>
                  {memb.role.trim().split('_').join(' ')}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Badge>{company.industry}</Badge>
              {company.location && <Badge>{company.location}</Badge>}
            </div>
            {company.website ? (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={company.website}
                className="text-text-secondary hover:text-brand-hover underline-offset-2 hover:underline"
              >
                {company.website}
              </Link>
            ) : (
              <p className="text-text-muted text-sm">No website</p>
            )}
            <p className="text-text-secondary text-sm">
              Created on {formattedDate(company.createdAt)}
            </p>
          </section>

          <section className="border-border space-y-2 border p-4">
            <h2 className="font-semibold">About the company</h2>
            {company.description ? (
              <p className="text-text-secondary wrap-break-word">
                {company.description}
              </p>
            ) : (
              <p className="text-text-muted text-sm">No description</p>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
