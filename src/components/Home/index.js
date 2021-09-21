import "./style.css"
import cc from "../../assets/cc.svg"
import phone from "../../assets/phone.svg"
import revenue from "../../assets/revenue.svg"
import security from "../../assets/security.svg"
import feedback from "../../assets/feedback.svg"
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent"
import Zoom from 'react-reveal/Zoom';

const Index = ({setSelected, isAdmin}) => {
    
    return (
      <>    
    <div className="card-container">
    
        <CardComponent
        svg={cc}
        setSelected={setSelected}
        isAdmin={isAdmin}
        Link={Link}
        cardTitle={"Open and manage accounts with ease."} 
        cardText={"No need to drop by a branch."}
        item={"item1"}  
       />      

        <CardComponent
        svg={phone}                        
        cardTitle={"Enjoy real-time and hassle-free transfers"} 
        cardText={"Transfer money to other banks via Instapay."}  
        item={"item2"}  
        />     

        <CardComponent
        svg={revenue}                        
        cardTitle={"Stash away funds for your passions"} 
        cardText={"Easily open your second savings account via our web portal."}  
        item={"item3"}
        />

        <CardComponent
        svg={security}
        cardTitle={"Relax and know your money is safe."} 
        cardText={"Your account is safe with our world class security measures."}  
        item={"item4"}
        /> 

        <CardComponent
        svg={feedback}
        cardTitle={"We're always ready to listen"} 
        cardText={"Let us know what you think!"}  
        item={"item5"}
        />  

    </div>
      </>
    );
}

export default Index
