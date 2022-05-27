import React from "react"
import "./breadcrumps.css"
import { Link } from "react-router-dom"


export const Breadcrumps = (props) => {
    return (
    <div className="page__breadcrumps">
        <Link to="/documents"><div className="page__last">Документы</div></Link>
        <div className="page__current">{props.nameBreeadcrumps}</div>
    </div>
    )
}
