import { File } from "./File";
import { page2 } from "./page2";

export class Article{
    id!: string;
  nom!: string;
  description!: string;
  prix!: number;
  nbstock!: number;
  page!:page2;
  image!:File;

}