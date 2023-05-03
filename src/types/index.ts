export interface Article {
  id: string,
  title: string,
  editor: string,
  content: string,
  image?: string,
  createdAt: Date,
}