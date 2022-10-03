import React,{useEffect,useState} from 'react';
import '../styles/CustomAlert.css';


const CustomAlert = ({state,texte}) => {
const [textAlert,setTextAlert] = useState("");

const AffAlerte = () =>{
    if(state){
        return(
               
        <div style={{dispay : "none"}} className="overlay">
            <div className="modal-body">
            <p>{textAlert}</p>
            </div>
            
        </div>
        )
    }else{
        return null
    }
}
useEffect(() => {
  setTextAlert(texte);
}, [])


    return (
       
        <div>
            <AffAlerte />
        </div>
        
    );
};


export default CustomAlert;