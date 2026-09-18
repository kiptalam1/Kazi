import CreateCompanyForm from '@/features/employer/components/CreateCompanyForm';

export default function EmployerOnboardingPage() {
  return (
    <section className="flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center">
      <CreateCompanyForm />
    </section>
  );
}
