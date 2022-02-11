import React from "react"
import "./Sidebar.css"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'

const getActiveStatus = ({ pathName, location }) => {
    const pathNameRegex = new RegExp(pathName,'g')
    return (
    location.pathname.match(pathNameRegex) ? "nav__btn-item nav__btn-item--selected" : "nav__btn-item")
}

export const Sidebar = () => {
    const location = useLocation();

    return(
        <div className="nav">
            <div className="nav__btn-list">
            <Link to="/documents"><button className={getActiveStatus({pathName:"/documents", location })} >Документы</button></Link>
                    <Link to="/tax"><button className={getActiveStatus({pathName:"/tax", location })}>Налоги</button></Link>
                    <Link to="/money"><button className={getActiveStatus({pathName:"/money", location })}>Деньги</button></Link>
                    <button className="nav__btn-item">Реквизиты</button>
                    <button className="nav__btn-item adaptive">Меню</button>
            </div>
        </div>
    )
}