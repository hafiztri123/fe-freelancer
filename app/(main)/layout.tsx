import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="p-[30px] flex-1">{children}</div>
      </div>
    </>
  );
}
