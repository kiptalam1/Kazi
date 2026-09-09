'use client';

import QueryError from "@/app/error";
import Loader from "@/app/loading";
import { Avatar } from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import FallbackAvatar from "@/components/ui/FallbackAvatar";
import NavLink from "@/components/ui/NavLink";
import useGetSingleCandidateApplication from "@/features/employer/hooks/useGetSingleCandidateApplication";
import formattedDate from "@/lib/utils/formattedDate";
import { useParams } from "next/navigation";
import CandidateEducation from "./CandidateEducation";

export default function SingleApplicationPage() {
  const { applicationId } = useParams();
  const { data, isPending, isError, error } = useGetSingleCandidateApplication(String(applicationId));

  if (isPending) {
    return <Loader />
  }

  if (isError) {
    return <QueryError error={error} />
  }

  const { candidate, job } = data;
  const { user } = candidate;
  const uniqueSkills = [
    ... new Set(
      (candidate.skills ?? [])
        .map((skill) => skill.trim())
        .filter(Boolean))];

  console.log(data);

  return (
    <div className="space-y-4 divide-y divide-border ">
      {/* candidate */}
      <section className="space-y-2 py-2">
        <h2 className="text-text-muted text-sm">Candidate</h2>

        <div className="flex items-start gap-4">
          <div className="">
            {
              candidate.user.avatar ? (
                <Avatar
                  src={candidate.user.avatar}
                  height={32}
                  width={32}
                  alt={candidate.user.firstName}
                  className="w-auto h-auto"
                />
              ) : (
                <FallbackAvatar
                  value={candidate.user.firstName}
                />)
            }
          </div>

          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-semibold ">{user.firstName} {user.lastName}</h1>
            {candidate.currentJobTitle &&
              <p>{candidate.currentJobTitle}</p>
            }
            {
              candidate.headline &&
              <p>{candidate.headline}</p>
            }
            <div className="flex items-center gap-4">
              {
                candidate.location &&
                <p>{candidate.location}</p>
              }
              {
                candidate.experienceLevel &&
                <p className="text-xs text-text-secondary">
                  {candidate.experienceLevel}
                </p>
              }
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4 flex-wrap '>
          {
            candidate.githubUrl &&
            <NavLink href={candidate.githubUrl} >
              Github
            </NavLink>
          }
          {
            candidate.linkedinUrl &&
            <NavLink href={candidate.linkedinUrl}>
              Linkedin
            </NavLink>
          }
          {
            candidate.portfolioUrl &&
            <NavLink href={candidate.portfolioUrl}>
              Portfolio
            </NavLink>
          }
        </div>
      </section>

      {/* application */}
      <section className="space-y-4 py-2">
        <div className="space-y-2">
          <h2 className="text-text-muted text-sm ">
            Application</h2>
          <p>Applied:          <span className="text-sm">{formattedDate(data.createdAt)}</span>
          </p>

          <p>Status: <span className="text-sm">{data.status}</span></p>
        </div>
        <p className="whitespace-pre-wrap wrap-break-word">{data.coverLetter ?? 'No cover letter provided'}</p>
      </section>

      {/* Professional Summary */}
      <section className="space-y-4 py-2">
        <h2 className="text-text-muted text-sm ">
          Professional Summary
        </h2>
        <p>{candidate.bio}</p>
        <div className="flex items-center gap-4 flex-wrap">
          {
            uniqueSkills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
        </div>
      </section>

      {/* experience  */}
      {/* education */}
      {candidate.education?.length ? (
        <section className="space-y-4 py-2">
          <h2 className="text-text-muted text-sm ">
            Education
          </h2>

          <div className="space-y-6 ">
            {
              candidate.education &&
              candidate.education.map((educ) => (
                <CandidateEducation
                  key={educ.id}
                  edu={educ} />
              )
              )}
          </div>
        </section>
      ) : null}
      <p className="text-sm">Salary Expectation: {' '}
        <span>{candidate.salaryExpectation ?? '-'}</span>
      </p>
    </div>
  )
}

