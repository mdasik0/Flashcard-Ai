export type Deck = {
  _id: string;
  deckName: string;
  creatorId: string;
  deckImage?: string;
  privacy: boolean;
  updatedAt: Date;
};

export type GetDeckApiRes<D> = {
  success: boolean;
  data: D
}
export type PostDeckApiRes<D> = {
  success: boolean,
  message: string,
  data: D
}