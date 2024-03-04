import React, { useState, useEffect } from "react";
import axios from "axios";

const BeautyAdviceForm = () => {
  const [formData, setFormData] = useState({
    skinType: "",
    productType: "",
    concerns: {
      acne: false,
      aging: false,
      sensitive: false,
    },
    skinTone: "",
  });

  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const cartId = Number(sessionStorage.getItem("cartId"));

  const handleSkinType = (selectedSkinType) => {
    setFormData((prevData) => ({
      ...prevData,
      skinType: selectedSkinType,
    }));
  };

  const handleProductType = (selectedProductType) => {
    setFormData((prevData) => ({
      ...prevData,
      productType: selectedProductType,
    }));
  };

  const handleConcerns = (concern, isChecked) => {
    setFormData((prevData) => ({
      ...prevData,
      concerns: {
        ...prevData.concerns,
        [concern.toLowerCase()]: isChecked,
      },
    }));
  };

  const handleSkinTone = (selectedSkinTone) => {
    setFormData((prevData) => ({
      ...prevData,
      skinTone: selectedSkinTone,
    }));
  };

  const handleMouseEnter = (productType) => {
    setHoveredProduct(productType);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/by-skin-type-and-product-type",
        {
          params: {
            skinType: formData.skinType,
            productType: formData.productType,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await axios.post(`http://localhost:8080/api/carts/${cartId}/addToCart`, {
        productId: product.id,
        quantity: 1,
        imageUrl: product.imageUrl,
      });
      alert("Product added to cart successfully:", product);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md border rounded shadow-lg mt-8 mb-8 bg-gradient-to-r from-gray-800 to-gray-400  to-pink-300">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Beauty Advice Recommended on Face Skin Type
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="mb-4">
          <label className="text-white block mb-1">Skin Type:</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`rounded-md overflow-hidden w-20 h-20 shadow-md ${
                formData.skinType === "normal" ? "border-2 border-white" : ""
              }`}
              onClick={() => handleSkinType("normal")}
            >
              <img
                src="https://images-static.nykaa.com/uploads/c30c2769-e779-46e5-a2fe-6c739e863860.jpg?tr=w-300,cm-pad_resize"
                alt="Normal Skin"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              type="button"
              className={`rounded-md overflow-hidden w-20 h-20 shadow-md ${
                formData.skinType === "oily" ? "border-2 border-white" : ""
              }`}
              onClick={() => handleSkinType("oily")}
            >
              <img
                src="https://images-static.nykaa.com/uploads/33025637-daee-4006-ad55-fa9403566679.jpg?tr=w-300,cm-pad_resize"
                alt="Oily Skin"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              type="button"
              className={`rounded-md overflow-hidden w-20 h-20 shadow-md ${
                formData.skinType === "dry" ? "border-2 border-white" : ""
              }`}
              onClick={() => handleSkinType("dry")}
            >
              <img
                src="https://images-static.nykaa.com/uploads/5ffb5ca6-6da2-43fd-8248-141a3c4026dc.jpg?tr=w-300,cm-pad_resize"
                alt="Dry Skin"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white block mb-1">Product Type:</label>
          <div className="flex space-x-2">
            {["Facewash", "Moisturizer", "Serum"].map((productType) => (
              <div
                key={productType}
                className="relative"
                style={{ position: "relative", zIndex: 1 }}
              >
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    className={`rounded-md overflow-hidden w-20 h-20 shadow-md ${
                      formData.productType === productType
                        ? "border-2 border-white"
                        : ""
                    }`}
                    onClick={() => handleProductType(productType)}
                    onMouseEnter={() => handleMouseEnter(productType)}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={
                        productType === "Facewash"
                          ? "https://i0.wp.com/demurebeauty.in/wp-content/uploads/2023/01/best-face-wash-for-oily-skin-in-india.jpg?resize=760%2C570&ssl=1"
                          : productType === "Moisturizer"
                          ? "https://www.verywellhealth.com/thmb/ey60IFfAnzR66x-5KILB9qGwe-8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/75167041-56a245445f9b58b7d0c8791e.jpg"
                          : "https://www.shape.com/thmb/FOpYDj_3zWJ9b-Dk3hztdce30nY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/serum-AdobeStock_285455224-b172770aa61f43de866092511fc2621f.jpg"
                      }
                      alt={productType}
                      className="w-full h-full object-cover"
                      style={{
                        transition: "transform 0.2s",
                        transformOrigin: "50% 50%",
                        transform:
                          hoveredProduct === productType
                            ? "scale(1.2)"
                            : "scale(1)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-75 rounded-md">
                      <span className="text-white text-sm font-bold capitalize">
                        {productType}
                      </span>
                    </div>
                  </button>
                  <span className="text-white text-sm font-bold capitalize mt-1">
                    {productType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white block mb-1">Concerns:</label>
          <div className="flex space-x-4">
            {["Acne", "Aging", "Sensitive"].map((concern) => (
              <div key={concern} className="flex items-center">
                <input
                  type="checkbox"
                  id={concern}
                  className="mr-2"
                  checked={formData.concerns[concern.toLowerCase()]}
                  onChange={(e) =>
                    handleConcerns(concern.toLowerCase(), e.target.checked)
                  }
                />
                <label htmlFor={concern} className="text-white">
                  {concern}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white block mb-1">Skin Tone:</label>
          <select
            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 w-40 h-10"
            value={formData.skinTone}
            onChange={(e) => handleSkinTone(e.target.value)}
          >
            <option value="">Select</option>
            <option value="fair">Fair</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 hover:text-gray-800"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4 text-white">
          Face wash for your {formData.skinType} Skin Type Recommended
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover mb-2 rounded"
              />
              <div className="text-gray-800 font-bold">{product.name}</div>
              <div className="text-gray-600">MRP: {product.price}</div>
              <button
                className="bg-pink-600 text-white font-serif py-2 px-3 text-xs hover:bg-pink-700 mt-1 shadow-md"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeautyAdviceForm;
