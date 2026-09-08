'use client';

import NavLink from "@/components/ui/NavLink";
import Spinner from "@/components/ui/Spinner";
import useApplicationsPerJob from "@/features/employer/hooks/useApplicationsPerJob"
import { getApiErrorMessage } from "@/lib/api/error";
import formattedDate from "@/lib/utils/formattedDate";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function JobApplicantsPage() {
  const { id } = useParams();
  const { data, isPending, isError, error } = useApplicationsPerJob(String(id));

  if (isPending) {
    return <div className="flex items-center justify-center w-full min-h-[50vh]">
      <Spinner />
    </div>
  }

  if (isError) {
    return <p className="text-center text-sm text-danger ">{getApiErrorMessage(error)}</p>
  }

  const applications = data.data;

  return (
    <div className="space-y-4">
      <NavLink
        href={`/employer/jobs/${id}`}
        className="hover:bg-background-muted flex w-fit items-center justify-center rounded-full p-2"
      >
        <ArrowLeft className="size-4" />
      </NavLink>

      <section className='border border-border overflow-hidden'>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse ">
            <thead className="border-b bg-background-subtle border-border-strong">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Experience</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y ">
              {
                applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-text-muted"
                    >
                      No applications yet.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id}
                      className="text-sm hover:bg-background-muted duration-75"
                    >
                      <td className="px-4 py-3 w-45 wrap-break-word">
                        <NavLink
                          href={`/employer/jobs/${id}/applicants/${app.id}`}
                        >{app.candidate.user.firstName} {app.candidate.user.lastName}
                        </NavLink>
                      </td>
                      <td className="px-4 py-3 text-text-secondary ">{app.candidate.user.email}</td>
                      <td className="px-4 py-3 text-xs text-text-muted">{app.candidate.experienceLevel}</td>
                      <td className="px-4 py-3 text-xs text-text-muted">{app.status}</td>
                      <td className="hidden sm:table-cell px-4 py-3 text-xs text-text-muted">{formattedDate(app.createdAt)}</td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

