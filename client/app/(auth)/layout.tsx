export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center sm:items-center min-h-screen p-4">
      {children}
    </main>
  );
}
