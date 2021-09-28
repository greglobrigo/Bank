import React from 'react'
import Zoom  from 'react-reveal/Zoom';


const CardComponent = ({svg, setSelected, isAdmin, Link, cardTitle, cardText, item}) => {
    return ( 
       
        <Zoom  up>
        <div className={`box-item ${item}`}>
        <div className="card">
        <object className="svg" data={svg} width="auto" height="250"> </object>
        <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>        
        <span className="card-span">
        <p className="card-text">{cardText}</p>
        {Link && <Link
        to={isAdmin ? "/users" : "/transactions"}>
        <button onClick={()=>setSelected(isAdmin ? 4 : 5)} className="btn btn-primary">Get started!</button>
        </Link>}
        </span>        
        </div>
        </div>     
        </div>
        </Zoom>
            
    )
}

export default CardComponent
