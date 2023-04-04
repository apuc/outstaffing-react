import React from "react";
import {Link} from "react-router-dom";

import rightArrow from "../../images/arrowRight.png"

import './categoriesItem.scss'

export const CategoriesItem = ({img, title, skills, available, link}) => {
    return(
        <Link to={link} className={available ? "categoriesItem" : "categoriesItem categoriesItem__disable"}>
            <div className='categoriesItem__title'>
                <img src={img} alt='img' />
                <h5>{title}</h5>
            </div>
            <div className='categoriesItem__description'>
                <p>{skills}</p>
                <div className='more'>
                    <img src={rightArrow} alt="arrow" />
                </div>
            </div>
        </Link>
    )
};

export default CategoriesItem
