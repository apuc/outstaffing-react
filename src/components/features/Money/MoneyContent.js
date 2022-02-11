import React from "react"
import { ColumnList } from "./ColumnList/ColumnList"
import "./moneyContent.css"
import { ContentTitle } from "../bookkeeping/ContentTitle/ContentTitle"
import { ContentTitleAbout } from "../bookkeeping/ContentTitleAbout/ContentTitleAbout"
import { ContentAbout } from "../bookkeeping/ContentAbout/ContentAbout"

export const MoneyContent = () => {
    return (
        <div>
            <div className="content__info"> 
                <ContentTitle title="Деньги" description="# Описание" />
                <ContentTitleAbout descriptionTitle="История денежных операций" />
                <ContentAbout contentAbout="Вы можете создать еще 4 документа. Чтобы создавать неограниченное число
                            документов, укажите ИНН и получите 30 дней Эльбы на тарифе «Премиум»
                            бесплатно. А для ИП младше 3 месяцев 0 год. " />
                <div className="content__column-list">
                    <ColumnList title="Списание"/>
                    <ColumnList title="Зачисления" />
                </div>
            </div>
        </div>
    )
}