'use client'
import { useJobs } from "@/features/jobs/hooks/useJobs";

export default function page() {
  const { data, isError, isPending, error } = useJobs();

  if (isPending) return <p>wait...</p>
  console.log(data)
  return (
    <main>
      <h1 className="text-text-primary text-xl">Jobs</h1>
      <section>{data?.data.map((job) => (
        <li>{job.title}</li>
      ))}</section>
    </main>
  );
}
