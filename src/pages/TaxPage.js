import React from 'react';
import { BookkeepingTemplete } from "../components/features/bookkeeping/BookkeepingTemplete/BookkeepingTemplete"
import { TaxContent } from "../components/features/Taxes/TaxContent/TaxContent"

export const TaxPage = () => {
    return (
        <BookkeepingTemplete>
            <TaxContent></TaxContent>
        </BookkeepingTemplete>
    )
}