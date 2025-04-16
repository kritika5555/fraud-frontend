import { useEffect, useState } from "react";
import axios from 'axios';
import { _axios } from "./config/axios";
import { useNavigate } from "react-router-dom";
const ReportForm = () => {
    const data = JSON.parse(localStorage.getItem("data") ?? "{}")
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        destAcc: "",
        tranAmt: "",
        transType: "",
        status: "",
        remarks: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.remarks)
            return alert("Please, provide some remarks");
        const submitData = {
            description: formData.remarks,
            account: formData.destAcc,
            status: formData.status,
            amount: formData.tranAmt,
            name: formData.destAcc
        }
        try {
            // Sending POST request to the Django API
            const response = await _axios.post("report-fraud/", submitData);

            // Show success message
            alert(response.data.message || "Report Submitted Successfully!");

            // Optionally, log the response to check the success data
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Error submitting the report. Please try again.");
        }
    };
    useEffect(() => {
        setFormData({
            ...formData,
            status: "Fradulant",
            tranAmt: data?.transaction_data.amount, // add the amount data here, which comes from scannig the qr
            destAcc: data?.transaction_data.nameDest,
            transType: data?.transaction_data.type,
        })
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <div className="absolute right-2 top-0.5 text-2xl cursor-pointer" onClick={() => navigate("/home")}>&times;</div>

                <h2 className="text-center text-lg font-semibold mb-4">Report Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-black font-medium">Destination Account</label>
                        <input
                            type="text"
                            name="destAcc"
                            value={formData.destAcc}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-black font-medium">Transaction Amount</label>
                        <input
                            type="text"
                            name="tranAmt"
                            value={formData.tranAmt}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-black font-medium">Transaction Type</label>
                        <input
                            type="text"
                            name="transType"
                            value={formData.transType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                            disabled
                        />
                    </div>
                    <div className="">
                        <label className="block text-black font-medium">Fraud Type</label>
                        <select
                            onChange={handleChange}
                            name="status"
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                            defaultValue={'Fradulant'}
                        >
                            <option value="Fradulant">Fraudulant</option>
                            <option value="Possible Fraud">Possible Fraud</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-black font-medium">Remarks</label>
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                            rows="3"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Report
                    </button>
                </form>
            </div>
        </div>
    );
};


export default ReportForm;
