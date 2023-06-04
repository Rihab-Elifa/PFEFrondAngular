import { Activity } from "./Activity";

export class pag{

    id!: string;
    title!: string;
    address!: string;
    email!: string;
    city!: string;
    phone!: number;
    activity!:Activity;
    postalCode!: number;
    region!:string;
    imageProfile!:File;
    imageCouverture!:File;
}