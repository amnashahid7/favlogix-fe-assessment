import { Phase } from "@/app/types";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
  phase
}: {
  children: React.ReactNode;
  phase: Phase;
}) {
  return (
    <>
  {phase == "loaded" && <Navbar />}
    <div className="grid grid-cols-[260px_330px_1fr_310px] gap-4 p-6">
      {children}
    </div>
      </>
  );
}