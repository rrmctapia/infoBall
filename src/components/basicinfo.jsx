import React from 'react'

export default function basicinfo( props ) {
    let val;
    if(props.value === ""){
        val = "No" + props.name; 
    }else{
        val = props.value;
    }
    return (
        <div className='basic-info'>
            <h2>  {props.name} </h2>
            <div className="player-info">
                {val} 
            </div>
        </div>
    )
}
