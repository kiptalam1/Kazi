'use client';
import QueryError from '@/app/error';
import Loader from '@/app/loading';
import { Avatar } from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import useMyCompany from '@/features/employer/hooks/useMyCompany';
import formattedDate from '@/lib/utils/formattedDate';
import { Edit2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import UpdateCompanyProfile from './(components)/UpdateCompanyProfile';

export default function EmployerProfilePage() {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
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
          <section className="border-border w-full space-y-2 border p-4">
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

            <div>
              <div className="flex items-center gap-1 sm:gap-3">
                <h1 className="min-w-0 flex-1 truncate text-xl font-bold sm:text-2xl">
                  {company.name}
                </h1>
                <div className="hidden items-center gap-3 sm:flex">
                  {company.companyMembers.map((memb) => (
                    <Badge key={memb.id} className="text-[9px] sm:text-xs">
                      {memb.role.trim().split('_').join(' ')}
                    </Badge>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setOpenUpdateModal(true)}
                  className="text-text-muted hover:bg-background-muted ml-auto shrink-0 rounded-full p-2"
                >
                  <Edit2 className="size-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 sm:hidden">
                {company.companyMembers.map((memb) => (
                  <Badge key={memb.id} className="w-fit text-[9px]">
                    {memb.role.trim().split('_').join(' ')}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{company.industry}</Badge>
              {company.location && <Badge>{company.location}</Badge>}
            </div>
            {company.website ? (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={company.website}
                className="text-text-secondary hover:text-brand-hover block wrap-break-word underline-offset-2 hover:underline"
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
              <p className="text-text-secondary wrap-break-word whitespace-pre-wrap">
                {company.description}
              </p>
            ) : (
              <p className="text-text-muted text-sm">No description</p>
            )}
          </section>

          <UpdateCompanyProfile
            open={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            company={company}
          />
        </div>
      ) : null}
    </div>
  );
}
