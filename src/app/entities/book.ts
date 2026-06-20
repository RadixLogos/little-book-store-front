import { Editor } from "./editor";
import { Genre } from "./Genre";

export interface Book {
    id: number;
    name: string;
    editor: Editor;
    description: string;
    author:string
    genresIds: number[];
    genres: Genre[];
    price: number;
    stockQuantity: number;
    imgUrl : string;
}
