import { useState } from "react";
import FraudAlert from "./fraud-alert";
import { useNavigate } from "react-router-dom";

function Alert() {
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(true);

    const handleIgnore = () => {
        setShowAlert(false);
        alert("You chose to ignore."); 
        
    };

    const handleAction = () => {
        navigate('/form')
        setShowAlert(false);
    };

    return <div>
        {showAlert && <FraudAlert onIgnore={handleIgnore} onTakeAction={handleAction} />}
    </div>;
}

export default Alert;
