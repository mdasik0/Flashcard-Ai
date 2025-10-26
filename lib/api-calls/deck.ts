import { Deck, GetDeckApiRes } from "@/types/deck";

export const getDecksByUserId = async (
  creatorId: string
): Promise<GetDeckApiRes<Deck[]> | undefined> => {
  if (!creatorId) {
    console.log(
      "There was an error trying to fetch decks by user id",
      "No user id found!"
    );
    return undefined;
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/decks/${creatorId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch decks: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching decks:", error);
    return undefined;
  }
};
