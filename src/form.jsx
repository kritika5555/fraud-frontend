import { useState } from "react";

const ReportForm = () => {
    const [formData, setFormData] = useState({
        accountHolder: "qawsderfgthyj",
        bankName: "",
        accountNumber: "",
        remarks: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Report Submitted!");
        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <div className="absolute right-2 top-0.5 text-2xl cursor-pointer ">&times;</div>

                <h2 className="text-center text-lg font-semibold mb-4">Report Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-black font-medium">Account Holder’s Name</label>
                        <input
                            type="text"
                            name="accountHolder"
                            value={formData.accountHolder}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-medium">Bank Name</label>
                        <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-medium">Account Number</label>
                        <input
                            type="number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 bg-gray-300 rounded border focus:outline-none"
                        />
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
