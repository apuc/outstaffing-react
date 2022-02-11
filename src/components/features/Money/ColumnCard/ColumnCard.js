import React from "react"
import "./columnCard.css"

export const ColumnItem = (props) => {
    return (
        <div>
            <div className="content-column-item">
                        <div className="content-column-item__info">
                            <div className="content-column-item__title">{props.title}</div>
                            <div className="content-column-item__date">{props.date} <span className="item-time">{props.time}</span></div>
                        </div>
                        <div className="content-column-item__amount">{props.amount}</div>
                        <div className="content-column-item__card">
                            <div className="item__card-kind">{props.card.name} --</div>
                            <div className="item__card-number">{props.card.number}</div>
                        </div>
                        <div className="content-column-item__balance">
                            <div className="item__balance-name">Баланс:</div>
                            <div className="item__balance-now">{props.balance}</div>
                        </div>
                    </div>
        </div>
    )
}