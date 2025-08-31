import MiniCard from "@/components/mini_card/MiniCard";
import ProtectedRoute from "@/components/UtilityComp/ProtectedRoute";

export default function cardsPage() {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-6 gap-6">
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />

        </div>
      </div>
    </ProtectedRoute>
  );
}
