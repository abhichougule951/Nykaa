import React from 'react';

const ProductCart = ({ item, handleQuantityChange }) => {
  const imageStyle = {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginRight: '4px',
  };

  return (
    <div className="card mb-3" style={{ backgroundColor: '#D8DADE' }} key={item.id}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={item.imageUrl} alt={item.name} style={imageStyle} />
          <div className="d-flex flex-column">
            <h5 className="mb-1">{item.name}</h5>
            <p className="mb-1 text-muted">₹{item.price} each</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-danger mx-2"
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="mx-2 font-weight-bold">{item.quantity}</span>
          <button
            className="btn btn-sm btn-outline-primary mx-2"
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <span className="font-weight-bold">₹{item.price * item.quantity}</span>
      </div>
    </div>
  );
};

export default ProductCart;
