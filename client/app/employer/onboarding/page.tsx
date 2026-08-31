import CreateCompanyForm from '@/features/employer/components/CreateCompanyForm';

export default function EmployerOnboardingPage() {
  return (
    <main className="p-4 sm:py-8 space-y-6 flex flex-col items-center justify-center">
      <CreateCompanyForm />
    </main>
  );
}
