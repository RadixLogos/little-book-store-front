import { OrderBook } from "./OrderBook";

export interface BuyOrderRequest {
    id: number;
    clientId: number | null | undefined;
    clientName: string;
    total: number;
    orderDate: Date;
    orderBooks: OrderBook[];
    receiptUrl: string;

}