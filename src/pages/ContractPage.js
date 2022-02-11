import React from 'react';
import { BookkeepingTemplete } from "../components/features/bookkeeping/BookkeepingTemplete/BookkeepingTemplete"
import { ContractContent } from "../components/features/bookkeeping/ContractContent/ContractContent"

export const ContractPage = () => {
    return (
        <div>
            <BookkeepingTemplete showBreadcrumps nameBreeadcrumps="Создание договора">
                <ContractContent />
            </BookkeepingTemplete>
        </div>
    )
}
