import FlipCard from "@/components/FlipCard/FlipCard";
import ProtectedRoute from "@/components/UtilityComp/ProtectedRoute";

export default function cardsPage() {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center w-full">
        {/* whole card */}
        <FlipCard />
      </div>
    </ProtectedRoute>
  );
}
