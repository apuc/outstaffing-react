import React from "react"
import './example.css'

export const Example = () => {
    return (
        <div className="example">
                <div className="example__bills">
                    <div className="example__part-first">
                        <div className="example-info__item">
                            <div className="example-item__amount">50 т. руб. =</div>
                            <div className="example-item__number">№ 123</div>
                        </div>
                        <div className="example-info__item">
                            <div className="example-item__amount">300т. руб. =</div>
                            <div className="example-item__number">№ 70</div>
                        </div>
                    </div>
                    <div className="example__part-second">
                        <div className="example__total">
                            <span>Итого:</span> 300 т. руб.
                        </div>
                        <div className="example__info-status example__info-status--completed">Оплачено</div>
                    </div>
                </div>
        </div>
    )
}