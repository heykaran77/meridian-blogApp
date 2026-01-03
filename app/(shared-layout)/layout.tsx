import { Navbar } from "@/components/common/navbar";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="selection:bg-blue-300/30 selection:text-[rgb(102,199,255)]">
      <Navbar />
      {children}
    </div>
  );
}
