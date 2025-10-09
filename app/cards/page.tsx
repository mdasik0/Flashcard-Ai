import CardsCarousel from "@/components/CardsCarousel/CardsCarousel";
import ProtectedRoute from "@/components/UtilityComp/ProtectedRoute";

export default function cardsPage() {
  return (
    <ProtectedRoute>
      <CardsCarousel />
    </ProtectedRoute>
  );
}
