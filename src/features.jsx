// src/pages/Features.jsx
import { useLocation } from 'react-router-dom';

const Features = () => {
    const query = new URLSearchParams(useLocation().search);
    const feature = query.get('type');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 capitalize">{feature} Page</h1>
            {/* Render specific component based on "feature" */}
            {feature === 'history' && <div>Transaction History...</div>}
            {feature === 'fd' && <div>Fixed Deposit Info...</div>}
            {feature === 'sip' && <div>SIP Management...</div>}
            {feature === 'flights' && <div>Flight Booking...</div>}
            {feature === 'tickets' && <div>Event Tickets...</div>}
            {feature === 'bills' && <div>Bill Payments...</div>}
        </div>
    );
};

export default Features;
