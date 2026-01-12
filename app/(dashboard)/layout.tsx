import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

