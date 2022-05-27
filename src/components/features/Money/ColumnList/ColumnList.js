import React from "react"
import "./columnList.css"
import { ColumnItem } from "../ColumnCard/ColumnCard"

const moneyCardarray = [{
    title : "Оплата в Сбербанк Онлайн",
    date : "12.01.2021",
    time : "21:19",
    amount : "100 P",
    card : {
        name : "Visa",
        number : "2869",
    },
    balance : "8 719, 43 Р",
},
{
    title : "Оплата в Сбербанк Онлайн",
    date : "12.01.2021",
    time : "21:19",
    amount : "100 P",
    card : {
        name : "Visa",
        number : "2869",
    },
    balance : "8 719, 43 Р",
},
{
    title : "Оплата в Сбербанк Онлайн",
    date : "12.01.2021",
    time : "21:19",
    amount : "100 P",
    card : {
        name : "Visa",
        number : "2869",
    },
    balance : "8 719, 43 Р",
},
{
    title : "Оплата в Сбербанк Онлайн",
    date : "12.01.2021",
    time : "21:19",
    amount : "100 P",
    card : {
        name : "Visa",
        number : "2869",
    },
    balance : "8 719, 43 Р",
},
{
    title : "Оплата в Сбербанк Онлайн",
    date : "12.01.2021",
    time : "21:19",
    amount : "100 P",
    card : {
        name : "Visa",
        number : "2869",
    },
    balance : "8 719, 43 Р",
}, ]

export const ColumnList = (props) => {
    return (
        <div>
            <div className="content-column">
                    <div className="content-column__title">{props.title}</div>
                    {moneyCardarray.map( (moneyCardItem, index) => {
                       return (
                        <ColumnItem {...moneyCardItem} />
                       ) 
                    })}
            </div>
        </div>
    )
}