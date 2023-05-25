
import { File } from "./File";
import { Produit } from "./Produit";
import { Produit2 } from "./Produit2";
import { Region } from "./Region";

export class page2{

    id!: string;
    title!: string;
    address!: string;
    email!: string;
    city!: string;
    phone!: number;
    activity!:string;
    postalCode!: number;
    region!:string;
    imageProfile!:File;
    imageCouverture!:File;
}