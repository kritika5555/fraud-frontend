import { useState } from "react";
import { _axios } from "./config/axios";

function ReportForm() {
    const [report, setReport] = useState({ description: "" });

    //this part handles the from submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await _axios.post("api/reports/", report)
            alert("Report submitted successfully!");
            setReport({ description: "" }); // Reset form

        } catch (error) {
            alert("Error submitting report.");

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={report.description}
                onChange={(e) => setReport({ description: e.target.value })}
                placeholder="Enter report details..."
            />
            <button type="submit">Submit Report</button>
        </form>
    );
}

export default ReportForm;

