import React from 'react'

export default function playerImage( props ) {
    let image = ""
    if(props.url === ""){
        image = "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg";
    }else{
        image = props.url;
    }
    return (
            <img alt="player" src={image}></img>
    )
}
