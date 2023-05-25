import {Categorie} from './Categorie';
import { File } from './File';

export class Produit {
  id!: string;
  name!: string;
  description!: string;
  prix!: number;
  stock!: number;
  c!:Categorie;
}