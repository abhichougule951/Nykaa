import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome, FaCity, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { toast } from 'react-toastify';


//My Project 62874
const BillingAddress = ({ nextStep }) => {
  const userId = sessionStorage.getItem("userId");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    getAddressesFromAPI();
  }, []);

  const getAddressesFromAPI = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/addresses`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const renderAddress = (address, isSelected) => (
    <div
      key={address.id}
      className={`mb-4 p-2 border rounded-md cursor-pointer ${
        isSelected ? "bg-blue-200" : "hover:bg-gray-200"
      } transition duration-300`}
      onClick={() => handleAddressClick(address)}
    >
      <span>{address.street},</span>
      <span>{address.city},</span>
      <span>{address.state},</span>
      <span>{address.postalCode}</span>
    </div>
  );

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const addNewAddress = () => {
    setAddingNewAddress(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveNewAddress = async (e) => {
    e.preventDefault();
  
    if (!validateInputs()) {
      return;
    }
  
    if (!selectedAddress) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/users/${userId}/addresses`,
          [newAddress]
        );
        const savedAddress = response.data;
  
        setSelectedAddress(savedAddress);
        setAddingNewAddress(false);
        setNewAddress({
          street: "",
          city: "",
          state: "",
          postalCode: "",
        });
  
        nextStep();
  
      
        window.location.reload();
      } catch (error) {
        console.error("Error saving new address:", error);
      }
    } else {
      nextStep();
    }
  };
  

  const validateInputs = () => {

    if (!selectedAddress && !addingNewAddress) {
      toast.error('Please select an address or add a new one to proceed.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return false;
    }
  

    if (addingNewAddress && !/^[A-Za-z\s]+$/.test(newAddress.city)) {
      toast.error('City should contain only alphabets.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return false;
    }
  

    if (addingNewAddress && !/^\d+$/.test(newAddress.postalCode)) {
      toast.error('Postal Code should contain only numbers.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return false;
    }
 
    for (const key in newAddress) {
      if (addingNewAddress && !newAddress[key]) {
        toast.error('All fields must be filled.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return false;
      }
    }
  
    return true;
  };
  
  

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md font-sans">
      <h2 className="text-2xl font-bold mb-4">Billing Address</h2>
      <form onSubmit={saveNewAddress}>
        {addresses.map((address) =>
          renderAddress(address, address === selectedAddress)
        )}
        {addingNewAddress && (
          <div>
          

            <div className="mb-3">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-600 flex items-center"
              >
                <FaHome className="mr-2" /> Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={newAddress.street}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your street address"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600 flex items-center"
              >
                <FaCity className="mr-2" /> City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your city"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-600 flex items-center"
              >
                <FaMapMarkerAlt className="mr-2" /> State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your state"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-600 flex items-center"
              >
                <FaEnvelope className="mr-2" /> Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your postal code"
              />
            </div>

       
          </div>
        )}
        <button
          type="button"
          onClick={addNewAddress}
          className="bg-green-500 hover-green text-white px-3 py-2 rounded-md focus:outline-none focus:shadow-outline-green active:bg-green-800 mr-2"
        >
          Add New Address
        </button>

        <button
          type="submit"
          className="bg-blue-500 hover-blue text-white px-3 py-2 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          
        >
          Save
        </button>
        
        {!selectedAddress && !addingNewAddress && (
          <p className="text-gray-600 mt-2">
            Please select an address or add a new one to proceed.
          </p>
        )}
      </form>
    </div>
  );
};

export default BillingAddress;
