import { Order } from "./Order";

export interface BuyOrderRequest {
    id: number;
    clientId: number | null | undefined;
    clientName: string;
    total: number;
    orderDate: Date;
    orders: Order[];
    receiptUrl: string;

}