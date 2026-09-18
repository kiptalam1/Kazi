export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background-muted flex min-h-screen justify-center p-4 sm:items-center">
      {children}
    </main>
  );
}
