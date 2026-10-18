import { Client } from "./client";
import { Order } from "./Order";

export interface BuyOrderResponse {
    id: number;
    client: Client;
    orderDate: Date;
    orders: Order[];
    receiptUrl: string;
    total: number;
}