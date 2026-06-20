import { Editor } from "./editor";
import { Genre } from "./Genre";

export interface BookResponse {
    id: number;
    bookName: string;
    editor: Editor;
    genres: Genre[];
    price: number;
    bookStock: number;
    imgUrl : string;
}
