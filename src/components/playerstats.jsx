import React from 'react'

export default function playerstats( props ) {
    return (
        <div className="stat">
            <h1 className="statName"> {props.name} </h1>
            <h2 className="statData"> {props.value} </h2> 
        </div>
    )
}
