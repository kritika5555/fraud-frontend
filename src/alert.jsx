import { useState } from "react";
import FraudAlert from "./fraud-alert";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'

function Alert() {
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(true);

    function handleIgnore() {
        toast(
            <div className="w-[380px bg-yellow-50 border border-yellow-300 rounded-xl px-6 shadow-lg text-yellow-900 font-sans flex items-center w-fit pt-2">
                <p className="mb-5 text-center">We have detected a potential fraud attempt. Do you wish to ignore the warning?</p>
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-medium text-nowrap cursor-pointer"
                    onClick={() => {
                        setShowAlert(false);
                        navigate('/payment');
                        toast.dismiss();
                    }}
                >
                    Yes
                </button>
            </div>
        );
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
