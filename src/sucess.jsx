import React from "react";

const NoFraudAlert = ({ onIgnore, onTakeAction }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg shadow-lg text-center max-w-md relative">
        <div className="absolute right-2 top-0.5 text-2xl cursor-pointer">&times;</div>
        <div className="flex flex-col items-center">
          <div className="bg-black text-white rounded-full p-2">
            <strong>!</strong>
          </div>
          <h2 className="text-lg font-semibold mt-2">Alert Notification</h2>
        </div>
        <p className="mt-4 text-gray-800">
            This account has no signs of fraudulent activity. Feel free to Proceed!
        </p>
        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={onIgnore}
          >
            Ignore & Proceed
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={onTakeAction}
          >
            Take Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoFraudAlert;
