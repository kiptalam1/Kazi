import Spinner from "@/components/ui/Spinner";
import { useCandidate } from "../hooks/useCandidate";
import { getApiErrorMessage } from "@/lib/api/error";

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

export const ProfileLinks = () => {
  const { data: candidate, isError: isCandidateError, error: candidateError, isPending: isCandidatePending } = useCandidate();

  if (isCandidatePending) {
    return (
      <div className="flex items-center justify-center  min-h-[50vh] w-full">
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

  )
}
