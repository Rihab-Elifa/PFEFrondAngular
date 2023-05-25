import { Categorie } from "./Categorie";
import { File } from "./File";

export class Produit2 {
    id!: string;
    name!: string;
    description!: string;
    prix!: number;
    stock!: number;
    image!:File;
    c!:Categorie;

  }