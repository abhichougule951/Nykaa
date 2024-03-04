import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const userId = sessionStorage.getItem('userId');

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    addresses: [],
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleAddressChange = (index, field, value) => {
    setFormData((prevData) => {
      const addresses = [...prevData.addresses];
      addresses[index][field] = value;
      return { ...prevData, addresses };
    });
  };

  const addAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      addresses: [
        ...prevData.addresses,
        { street: '', city: '', state: '', postalCode: '' },
      ],
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(username);
  };

  const validateCity = (city) => {
    return city.length <= 100 && /^[a-zA-Z\s]+$/.test(city);
  };

  const updateUser = async () => {
    try {
      // Validations
      if (!validateEmail(formData.email)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
        return;
      }

      if (!validateUsername(formData.username)) {
        setErrors((prevErrors) => ({ ...prevErrors, username: 'Username must contain only letters' }));
        return;
      }

      await axios.post(`http://localhost:8080/api/users/${userId}`, {
        email: formData.email,
        username: formData.username,
      });
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const saveAddresses = async () => {
    try {
      // Validations
      const invalidCity = formData.addresses.some((address) => !validateCity(address.city));
      if (invalidCity) {
        setErrors((prevErrors) => ({ ...prevErrors, city: 'Invalid city name or exceeds 100 characters' }));
        return;
      }

      const requestData = formData.addresses.map((address) => ({
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
      }));

      await axios.post(`http://localhost:8080/api/users/${userId}/addresses`, requestData);
      console.log('Addresses saved successfully!');
    } catch (error) {
      console.error('Error saving addresses:', error);
    }
  };

  return (
    <div className="w-96 mx-auto p-6 bg-gradient-to-r from-red-plum to-red-100 shadow-md rounded-md mt-8 mb-8 font-serif">
      <h2 className="text-3xl font-bold text-white mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-white">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded focus:outline-none focus:border-pink-300 ${
            errors.email && 'border-red-500'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-white">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded focus:outline-none focus:border-pink-300 ${
            errors.username && 'border-red-500'
          }`}
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-white">Addresses</label>
        {formData.addresses.map((address, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                placeholder="Street"
                className="w-full p-2 border rounded focus:outline-none focus:border-pink-300 mr-2"
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                placeholder="City"
                className={`w-full p-2 border rounded focus:outline-none focus:border-pink-300 ${
                  errors.city && 'border-red-500'
                } mr-2`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                placeholder="State"
                className="w-full p-2 border rounded focus:outline-none focus:border-pink-300 mr-2"
              />
              <input
                type="number"
                name="postalCode"
                value={address.postalCode}
                onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                placeholder="Postal Code"
                className="w-full p-2 border rounded focus:outline-none focus:border-pink-300"
              />
            </div>
          </div>
        ))}
        <button onClick={addAddress} className="text-blue-500 underline">
          Add Address
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={updateUser}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none mr-12 ml-0"
        >
          Update User
        </button>
        <button
          onClick={saveAddresses}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none ml-12"
        >
          Save Addresses
        </button>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <div className="w-16 h-16 bg-blue-500 text-white rounded-full border-4 border-white flex items-center justify-center">
          Nykaa
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
