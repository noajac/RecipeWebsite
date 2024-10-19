import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css'; // Ensure you have the updated CSS file

const SuccessPage = () => {
  return (
    <div className="success-page">
      <h1>Successfully Upload Your Recipe</h1>
      <div className="checkmark-container">
        <div className="checkmark">
          &#10003; {/* Unicode checkmark symbol */}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
