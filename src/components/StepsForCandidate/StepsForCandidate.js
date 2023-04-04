import React from 'react';

import './stepForCandidate.scss'

export const StepsForCandidate = ({step}) => {
    return(
        <div className='step'>
            <div className='step__start'>
                <span>2</span>
                <p>шага для твоего входа в команду </p>
            </div>
            <div className='step__info'>
                <p>{step}</p>
                <span>из 2</span>
            </div>
        </div>
    )
};

export default StepsForCandidate
