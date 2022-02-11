import React from "react";
import "./bookkeepingContent.css"
import { DocumentCard } from "../DocumentCard/DocumentCard"
import Act from "../../../../images/act.png"
import Contract from "../../../../images/Contract.png"
import Tax from "../../../../images/Tax.png"
import Money from "../../../../images/money.png"
import { ContentTitle } from "../ContentTitle/ContentTitle"
import { ContentTitleAbout } from "../ContentTitleAbout/ContentTitleAbout"
import { ContentAbout } from "../ContentAbout/ContentAbout"


export const BookkeepingContent = () => {
    return (

        <div className="content__info">
            <ContentTitle title="Документы" description="# Описание" />
                <ContentTitleAbout descriptionTitle="SVM - сервис выездных менеджеров для банка ПСБ" />
                <ContentAbout contentAbout="Вы можете создать еще 4 документа. Чтобы создавать неограниченное число документов, укажите ИНН и получите 30 дней Эльбы на тарифе «Премиум» бесплатно. А для ИП младше 3 месяцев 0 год." />
            <div className="content__label-list">
                <div className="content-label">
                    <DocumentCard img={Act} title="Акт" link="/documents/act" className="content-item__text" />
                    <DocumentCard img={Tax} title="Налог" className="content-item__text"/>
                </div>
                <div className="content-label">
                    <DocumentCard img={Contract} title="Договор" link="/documents/contract" className="content-item__text"/>
                    <DocumentCard img={Money} title="Деньги" className="content-item__text"/>
                </div>
            </div>
        </div>
    )
}