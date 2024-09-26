import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Function to handle closing the privacy policy
  const closePrivacyPolicy = () => {
    navigate("/"); // Redirect to the homepage (or any route you want)
  };

  return (
    <div className="privacy-policy-container">
      <button className="close-button" onClick={closePrivacyPolicy}>
        &times; 
      </button>
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      <p className="privacy-policy-text">
        Welcome to Atharax, a web development and design company. We value your
        privacy and are committed to protecting your personal information. This
        Privacy Policy explains how we collect, use, and share information about
        you when you visit our website or use our services.
      </p>
      <h2 className="privacy-section-title">1. Information We Collect</h2>
      <p className="privacy-policy-text">
        We may collect the following types of information:
        <ul>
          <li>
            Personal details (e.g., name, email address) when you contact us or
            request a quote.
          </li>
          <li>
            Usage data (e.g., pages visited, duration of visit) to improve our
            services.
          </li>
          <li>Cookies to enhance user experience.</li>
        </ul>
      </p>
      <h2 className="privacy-section-title">2. How We Use Your Information</h2>
      <p className="privacy-policy-text">
        We use the information we collect to:
        <ul>
          <li>Respond to inquiries and provide services.</li>
          <li>Improve the functionality and usability of our website.</li>
          <li>Analyze usage data to enhance our marketing strategies.</li>
        </ul>
      </p>
      <h2 className="privacy-section-title">3. Sharing Your Information</h2>
      <p className="privacy-policy-text">
        We do not share your personal information with third parties, except as
        required by law or to protect our rights.
      </p>
      <h2 className="privacy-section-title">4. Your Rights</h2>
      <p className="privacy-policy-text">
        You have the right to access, correct, or delete your personal
        information. To exercise these rights, please contact us at{" "}
        <a href="mailto:atharax.co@gmail.com">atharax.co@gmail.com</a>.
      </p>
      <h2 className="privacy-section-title">5. Changes to This Policy</h2>
      <p className="privacy-policy-text">
        We may update this policy from time to time. Any changes will be posted
        on this page with the date of revision.
      </p>
      <h2 className="privacy-section-title">6. Contact Us</h2>
      <p className="privacy-policy-text">
        If you have any questions or concerns about this privacy policy, feel
        free to contact us at{" "}
        <a href="mailto:atharax.co@gmail.com">atharax.co@gmail.com</a>.
      </p>
      <p className="privacy-policy-date">Last updated: September 2024</p>
    </div>
  );
};

export default PrivacyPolicy;
