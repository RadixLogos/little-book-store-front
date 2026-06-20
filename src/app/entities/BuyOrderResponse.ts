import { Client } from "./client";
import { OrderBook } from "./OrderBook";

export interface BuyOrderResponse {
    id: number;
    client: Client;
    orderDate: Date;
    orderBooks: OrderBook[];
    receiptUrl: string;
    total: number;
}