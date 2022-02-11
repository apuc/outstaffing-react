import React from 'react';
import { BookkeepingTemplete } from "../components/features/bookkeeping/BookkeepingTemplete/BookkeepingTemplete"
import { BookkeepingContent } from "../components/features/bookkeeping/BookkeepingContent/BookkeepingContent"



const Bookkeeping = () => {
    return(
        <div>
            <BookkeepingTemplete>
                <BookkeepingContent></BookkeepingContent>
            </BookkeepingTemplete>
        </div>
    )
}

export default Bookkeeping

