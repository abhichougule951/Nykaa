import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShippingFast,
  faUndo,
  faCheckCircle,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTwitter,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const handleSend = () => {
    toast.success('Get special discount in your inbox!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  };

  const openSocialMediaLink = (socialMedia) => {
    console.log(`Clicked on ${socialMedia}`);
  };

  return (
    <footer className="py-4 bg-gray-200 shadow-md" style={{ fontFamily: 'Assistant, Saans, sans-serif' }}>
      <div className="container mx-auto text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-2">
            <h2 className="font-weight-bold mb-2 text-lg">Nykaa</h2>
            <p className="text-sm">Your beauty, our passion. Explore a wide range of beauty and cosmetic products.</p>
          </div>
          <div className="mb-2 ml-11">
            <h5 className="font-weight-bold mb-2 text-lg ml-11">Our Promise</h5>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li className="mb-1 flex items-center">
                <FontAwesomeIcon icon={faShippingFast} className="text-green-500 mr-2" />
                Free Shipping
              </li>
              <li className="mb-1 flex items-center">
                <FontAwesomeIcon icon={faUndo} className="text-red-500 mr-2" />
                Easy Return
              </li>
              <li className="mb-1 flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                100% Authentic
              </li>
              <li className="mb-1 flex items-center">
                <FontAwesomeIcon icon={faTags} className="text-blue-500 mr-2" />
                1900+ Brands
              </li>
            </ul>
          </div>
          <div className="mb-2 ml-11">
            <h5 className="font-weight-bold mb-2 text-lg ml-11">Quick Links</h5>
            <ul className="list-disc list-inside ml-6 text-sm">
              <li className="mb-1">
                <a href="#" className="text-gray-700">Terms and Conditions</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-700">Shipping Policy</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-700">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-2 border-gray-700" />
        <div className="mb-2 flex items-center">
          <h5 className="font-weight-bold mb-2 text-lg mr-22">Get special discount in your inbox</h5>
          <div className="flex items-center ml-20">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 border border-gray-300 rounded-l text-sm mr-22"
            />
            <button
              className="bg-gray-800 text-white p-0 rounded-r text-xs h-9 w-10 ml-1"
              onClick={handleSend}
            >
              SEND
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 justify-center">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-2xl text-purple-600 cursor-pointer"
            onClick={() => openSocialMediaLink('Instagram')}
          />
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-2xl text-blue-600 cursor-pointer"
            onClick={() => openSocialMediaLink('Facebook')}
          />
          <FontAwesomeIcon
            icon={faYoutube}
            className="text-2xl text-red-600 cursor-pointer"
            onClick={() => openSocialMediaLink('Youtube')}
          />
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-2xl text-blue-400 cursor-pointer"
            onClick={() => openSocialMediaLink('Twitter')}
          />
          <FontAwesomeIcon
            icon={faPinterest}
            className="text-2xl text-red-400 cursor-pointer"
            onClick={() => openSocialMediaLink('Pinterest')}
          />
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
