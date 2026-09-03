import CreateCompanyForm from '@/features/employer/components/CreateCompanyForm';

export default function EmployerOnboardingPage() {
  return (
    <main className="flex flex-col items-center justify-center space-y-6 p-4 sm:py-8">
      <CreateCompanyForm />
    </main>
  );
}
