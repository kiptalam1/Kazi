import Spinner from "@/components/ui/Spinner";
import { useCandidate } from "../hooks/useCandidate";
import { getApiErrorMessage } from "@/lib/api/error";

export const ProfessionalInfo = () => {

  const { data: candidate, isError: isCandidateError, error: candidateError, isPending: isCandidatePending } = useCandidate();

  if (isCandidatePending) {
    return (
      <div className="flex items-center justify-center  min-h-[50vh] w-full ">
        <Spinner />
      </div>
    );
  }

  if (isCandidateError) {
    return (
      <p className="text-center mx-auto p-6">{getApiErrorMessage(candidateError)}</p>
    );
  }


  return (
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
            <p className="mt-1 text-sm p-1 bg-background-muted w-fit text-text-secondary">
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
  )
}
