import React from "react"
import "./taxContent.css"
import { ReportTax } from "./ReportTax/ReportTax"
import Quarter from "../../../../images/Reporting-1.png"
import HalfYear from "../../../../images/Reporting-2.png"
import NineMonth from "../../../../images/Reporting-3.png"
import Year from "../../../../images/Taxes.png"
import { Example } from "../Example/example"
import { ContentTitle } from "../../bookkeeping/ContentTitle/ContentTitle"
import { ContentAbout } from "../../bookkeeping/ContentAbout/ContentAbout"



export const TaxContent =() => {
    return(
        <div className="tax-content">
            <ContentTitle title="Оплата налога и предоставление от четности" description="# Описание оплаты налога" />
            <ContentAbout contentAbout="Налогоплательщики, применяющие упрощенную систему налогообложения,
                не вправе до окончания налогового периода перейти на иной режим
                налогообложения." />
                <div className="content__period">
                    <div className="period__column-report">
                    <div className="period-column__name">Отчетный период</div>
                        <ReportTax img={Quarter} time="Квартал" period={3}></ReportTax>
                        <ReportTax img={HalfYear} time="Полугодие" period={6}></ReportTax>
                        <ReportTax img={NineMonth} time="9 месяцев" period={9}></ReportTax>
                    </div>

                    <div className="period__column-tax">
                        <div className="period-column__name">Налоговый период</div>
                            <ReportTax img={Year} time="Год" period={12}></ReportTax>
                    </div>
                </div>
                <Example></Example>
                <div className="example__description">
                    <p>Если последний день срока уплаты налога (авансового платежа) выпадает
                        на выходной или нерабочий праздничный день, перечислить налог плательщик
                        обязан в ближайший следующий за ним рабочий день.</p>
                </div>
        </div>
    )
}