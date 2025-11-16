import Sidebar from "./_components/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
