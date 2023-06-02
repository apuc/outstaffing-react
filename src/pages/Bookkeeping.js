import React from "react";

import { BookkeepingContent } from "@components/features/bookkeeping/BookkeepingContent/BookkeepingContent";
import { BookkeepingTemplete } from "@components/features/bookkeeping/BookkeepingTemplete/BookkeepingTemplete";

const Bookkeeping = () => {
  return (
    <div>
      <BookkeepingTemplete>
        <BookkeepingContent></BookkeepingContent>
      </BookkeepingTemplete>
    </div>
  );
};

export default Bookkeeping;
