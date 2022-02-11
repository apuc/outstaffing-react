import React from 'react';
import { ActContent } from "../components/features/bookkeeping/ActContent/ActContent"
import { BookkeepingTemplete } from "../components/features/bookkeeping/BookkeepingTemplete/BookkeepingTemplete"

export const ActPage = () => {
    return (
        <div>
            <BookkeepingTemplete showBreadcrumps nameBreeadcrumps="Создание акта">
                <ActContent></ActContent>
            </BookkeepingTemplete>
        </div>
    )
}