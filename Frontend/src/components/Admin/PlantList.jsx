//To show seprate component to show product table beside of form in productmanager 
import React from 'react';

function PlantList({ plants, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Care</th><th>Actions</th><th>Image</th>
        </tr>
      </thead>
      <tbody>
        {plants.map(plant => (
          <tr key={plant._id}>
            <td>{plant.name}</td>
            <td>{plant.price}</td>
            <td>{plant.category}</td>
            <td>{plant.stock}</td>
            <td>{plant.care}</td>
             <td>
              {plant.imageUrl && (
                <img
                  src={`http://localhost:5000/uploads/${plant.imageUrl}`}
                  alt={plant.name}
                  width="60"
                />
              )}
            </td>
            <td>
              <button onClick={() => onEdit(plant)}>Edit</button>
              <button onClick={() => onDelete(plant._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlantList;
