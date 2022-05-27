import React from "react"
import "./documentCard.css"
import { Link } from "react-router-dom"

export const DocumentCard = (props) => {
    return (
            <div className="content-label-item">
                            <div className="content-label-item__img">
                                <img src={props.img} alt="" className="content-label-item-img__pic" />
                            </div>
                            <div className="content-label-item__info">
                                <Link to={props.link ? props.link : ""}><div className="content-label-item__add">Добавить</div></Link>
                                <div className="content-label-item__title">{props.title}</div>
                            </div>
            </div>
    )
}