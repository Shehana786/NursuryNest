import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/Global.css';
import AboutUs from '../components/AboutUs'; // Correct import

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/products/featured');
        setFeaturedPlants(res.data);
        setFilteredPlants(res.data);
      } catch (err) {
        console.error('Error fetching featured:', err);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/products/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPlants(featuredPlants);
    } else {
      setFilteredPlants(
        featuredPlants.filter((plant) =>
          plant.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="home-container">
      {/* Carousel */}
      <section className="carousel-wrapper">
        <Slider {...carouselSettings}>
          {['Slide1.png', 'Slide2.png', 'Slide3.jpg'].map((img, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={`/assests/${img}`}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
              <div className="carousel-overlay">
                <h1>Welcome to NatureNest</h1>
                <p>
                  Discover, shop, and learn plant care from the experts.<br />
                  Find the perfect plants for your home or garden, all in one place.<br />
                  Expert tips, quality products, and beautiful greenery await you.
                </p>
                <a href="/catalog">
                  <button className="carousel-button">Shop Now</button>
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* About Us Section */}
      <AboutUs />

      {/* Featured Plants */}
      <section className="featured-section">
        <h2>Featured Plants</h2>
        <p className="subheading">Explore our best selections by Catagory</p>

        <div className="filter-buttons">
          {['All', 'Indoor', 'Outdoor', 'Medicinal', 'Evergreen', 'Flowering', 'Ornamental', 'Bonsai', 'Plant Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={activeCategory === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredPlants.map((plant) => (
            <div className="portfolio-item" key={plant._id}>
              <div className="portfolio-img-wrapper">
                <img
                  src={`http://localhost:5000/uploads/${plant.imageUrl}`}
                  alt={plant.name}
                  className="featured-img"
                />
                <div className="portfolio-hover">
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <a href={`/product/${plant._id}`} className="view-details">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} NatureNest | All rights reserved 🌱</p>
      </footer>
    </div>
  );
};

export default Home;
