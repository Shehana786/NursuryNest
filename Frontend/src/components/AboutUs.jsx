import React from 'react';
import '../Styles/Global.css';

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <h2 className="about-heading">About Us</h2>
      <div className="about-us-container">
        <div className="about-us-image">
          <img src="/assests/medium-shot-woman-wearing-gloves.jpg" alt="About Us" />
        </div>
        <div className="about-us-text">
          <p>
            At NatureNest, we believe that greenery brings life, peace, and happiness. Our goal is to help you reconnect with nature by making plants accessible and easy to care for — whether you're a beginner or a seasoned plant lover.
          </p>
          <p>
            From elegant indoor plants that purify your air to hardy outdoor varieties that thrive year-round, we provide a wide range of quality selections tailored to every environment. Our handpicked collections are chosen not just for beauty, but for resilience and ease of care.
          </p>
          <p>
            We also offer expert advice, gardening tips, and eco-friendly tools to support your journey to a greener lifestyle. Whether you're decorating your home, setting up a balcony garden, or choosing gifts, NatureNest is your trusted companion for all things plant-related.
          </p>
         
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
