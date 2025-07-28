import React, { useState } from "react";
import Header from "./Header";

const App = () => {
  const [user, setUser] = useState(null); // mock user login state

  return (
    <>
      <Header user={user} setUser={setUser} />
      <main>
        <section
          className="hero-section"
          style={{
            backgroundImage: "url('/assets/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "90vh",
            position: "relative",
          }}
        >
          <div
            className="hero-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.45)",
            }}
          ></div>

          <div
            className="hero-content"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "600px",
              margin: "0 auto",
              paddingTop: "20vh",
              textAlign: "center",
              color: "white",
            }}
          >
            <h1 style={{ fontSize: "48px", fontWeight: 600, marginBottom: "20px" }}>
              Welcome to NatureNest 🌿
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Discover, shop, and learn plant care from the experts.
              <br />
              Find the perfect plants for your home or garden.
              <br />
              Expert tips, quality products, and beautiful greenery await you.
            </p>
            <a href="/catalog">
              <button
                style={{
                  marginTop: "25px",
                  padding: "12px 28px",
                  fontSize: "16px",
                  backgroundColor: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Shop Now
              </button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
