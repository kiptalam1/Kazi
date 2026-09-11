'use client';

import QueryError from '@/app/error';
import Loader from '@/app/loading';
import { Avatar } from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import NavLink from '@/components/ui/NavLink';
import useGetSingleCandidateApplication from '@/features/employer/hooks/useGetSingleCandidateApplication';
import formattedDate from '@/lib/utils/formattedDate';
import { useParams } from 'next/navigation';
import CandidateEducation from './CandidateEducation';
import CandidateExperience from './CandidateExperience';

export default function SingleApplicationPage() {
  const { applicationId } = useParams();
  const { data, isPending, isError, error } = useGetSingleCandidateApplication(
    String(applicationId),
  );

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  const { candidate } = data;
  const { user } = candidate;
  const uniqueSkills = [
    ...new Set(
      (candidate.skills ?? []).map((skill) => skill.trim()).filter(Boolean),
    ),
  ];

  return (
    <div className="divide-border space-y-4 divide-y">
      {/* candidate */}
      <section className="space-y-2 py-2">
        <div className="flex items-start gap-4">
          {user.avatar ? (
            <Avatar
              src={user.avatar}
              height={32}
              width={32}
              alt={user.firstName}
              className="h-auto w-auto"
            />
          ) : (
            <FallbackAvatar value={user.firstName} />
          )}

          <div className="flex-1">
            <h1 className="text-lg font-semibold sm:text-xl">
              {user.firstName} {user.lastName}
            </h1>
            {candidate.currentJobTitle && <p>{candidate.currentJobTitle}</p>}
            {candidate.headline && (
              <p className="text-text-secondary text-sm">
                {candidate.headline}
              </p>
            )}
            <div className="flex items-center gap-4">
              {candidate.location && <p>{candidate.location}</p>}
              {candidate.experienceLevel && (
                <p className="text-text-secondary text-xs">
                  {candidate.experienceLevel}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 py-1">
              {candidate.githubUrl && (
                <NavLink
                  href={candidate.githubUrl}
                  className="text-brand-active text-sm italic"
                >
                  Github
                </NavLink>
              )}
              {candidate.linkedinUrl && (
                <NavLink
                  href={candidate.linkedinUrl}
                  className="text-brand-active text-sm italic"
                >
                  Linkedin
                </NavLink>
              )}
              {candidate.portfolioUrl && (
                <NavLink
                  href={candidate.portfolioUrl}
                  className="text-brand-active text-sm italic"
                >
                  {' '}
                  Portfolio
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* application */}
      <section className="space-y-4 py-2">
        <div className="space-y-2">
          <h2 className="text-text-secondary text-sm font-medium">
            Application
          </h2>
          <p>
            Applied:{' '}
            <span className="text-sm">{formattedDate(data.createdAt)}</span>
          </p>

          <p>
            Status: <span className="text-sm">{data.status}</span>
          </p>
        </div>
        {data.coverLetter ? (
          <p className="wrap-break-word whitespace-pre-wrap">
            {data.coverLetter}
          </p>
        ) : (
          <p className="text-text-muted text-sm italic">
            No cover letter provided.
          </p>
        )}
      </section>
      {/* Professional Summary */}
      <section className="space-y-4 py-2">
        <h2 className="text-text-secondary text-sm font-medium">
          Professional Summary
        </h2>
        <p>{candidate.bio}</p>
        <div className="flex flex-wrap items-center gap-4">
          {uniqueSkills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </section>
      {/* experience  */}
      {candidate.experiences.length > 0 && (
        <section className="space-y-4 py-2">
          <h2 className="text-text-secondary text-sm font-medium">
            Experience
          </h2>

          <div className="space-y-6">
            {candidate.experiences.map((exp) => (
              <CandidateExperience key={exp.id} exp={exp} />
            ))}
          </div>
        </section>
      )}
      {/* education */}
      {candidate.education.length > 0 && (
        <section className="space-y-4 py-2">
          <h2 className="text-text-secondary text-sm font-medium">Education</h2>

          <div className="space-y-6">
            {candidate.education.map((educ) => (
              <CandidateEducation key={educ.id} edu={educ} />
            ))}
          </div>
        </section>
      )}
      <section className="py-2">
        <h2 className="text-text-secondary text-sm font-medium">
          Salary Expectation
        </h2>
        <p className="mt-2">{candidate.salaryExpectation ?? '-'}</p>
      </section>{' '}
    </div>
  );
}
