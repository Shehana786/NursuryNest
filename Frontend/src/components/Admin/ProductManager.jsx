import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlantList from './PlantList';
import '../../Styles/Global.css';

function ProductManager() {
  const categories = ['Indoor', 'Outdoor', 'Medicinal', 'Decorative'];
  const [plants, setPlants] = useState([]);

  const [plant, setPlant] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    care: '',
    featured: false,  // <-- Added featured field
  });

  const [editingPlant, setEditingPlant] = useState(null);
  const [image, setImage] = useState(null);

  const fetchPlants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products');
      setPlants(res.data);
    } catch (err) {
      console.error('Failed to fetch plants');
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox separately
    if (type === 'checkbox') {
      setPlant({ ...plant, [name]: checked });
    } else {
      setPlant({ ...plant, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(plant).forEach(key => formData.append(key, plant[key]));
    if (image) formData.append('image', image);

    try {
      if (editingPlant) {
        // Edit mode
        await axios.put(
          `http://localhost:5000/api/admin/products/${editingPlant._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        alert('Plant updated!');
      } else {
        // Add mode
        await axios.post('http://localhost:5000/api/admin/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('Plant added!');
      }

      setPlant({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        care: '',
        featured: false, // reset featured to false
      });
      setImage(null);
      setEditingPlant(null);
      fetchPlants();
    } catch (err) {
      alert('Failed to save plant');
    }
  };

  const handleEdit = (plantToEdit) => {
    setPlant({
      name: plantToEdit.name,
      price: plantToEdit.price,
      category: plantToEdit.category,
      description: plantToEdit.description,
      stock: plantToEdit.stock,
      care: plantToEdit.care,
      featured: plantToEdit.featured || false,  // load featured state
    });
    setEditingPlant(plantToEdit);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Plant deleted!');
      fetchPlants();
    } catch (err) {
      alert('Failed to delete plant');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <input
          type="text"
          name="name"
          value={plant.name}
          onChange={handleChange}
          placeholder="Plant Name"
        />
        <input
          type="number"
          name="price"
          value={plant.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <select
          name="category"
          value={plant.category}
          onChange={handleChange}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat, i) => (
            <option value={cat} key={i}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          value={plant.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="stock"
          value={plant.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
        />
        <textarea
          name="care"
          value={plant.care}
          onChange={handleChange}
          placeholder="Care Instructions"
        />
        <label>
          <input
            type="checkbox"
            name="featured"
            checked={plant.featured}
            onChange={handleChange}
          />
          Featured Product
        </label>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">
          {editingPlant ? 'Update Plant' : 'Add Plant'}
        </button>
      </form>

      <div style={{ flex: 1 }}>
        <PlantList plants={plants} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default ProductManager;
