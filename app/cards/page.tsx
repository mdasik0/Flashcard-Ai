import Cards from "@/components/Cards/Cards";
import ProtectedRoute from "@/components/UtilityComp/ProtectedRoute";

export default function cardsPage() {
  return (
    <ProtectedRoute>
      <Cards />
    </ProtectedRoute>
  );
}
