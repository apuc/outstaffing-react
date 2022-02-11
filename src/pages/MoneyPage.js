import React from 'react';
import { BookkeepingTemplete } from "../components/features/bookkeeping/BookkeepingTemplete/BookkeepingTemplete"
import { MoneyContent } from "../components/features/Money/MoneyContent"

export const MoneyPage = () => {
    return (
        <div>
            <BookkeepingTemplete>
                <MoneyContent></MoneyContent>
            </BookkeepingTemplete>
        </div>
    )
}