import React from 'react'
// import {Card, CardContent, Typography} from '@material-ui/core';
import "./InfoBox.css"

function InfoBox({title, cases, total}) {
    return (
            <div className="infoBox">
                <h2>{title}</h2>
                <h3>{cases}</h3>
                <h3>Total: {total}</h3>
            </div>
            
    )
}

export default InfoBox
