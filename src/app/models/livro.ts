export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  genero: string;
  anoPublicacao: number | null;
}