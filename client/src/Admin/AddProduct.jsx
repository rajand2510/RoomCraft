
import  { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    discription: '',
    price: '',
    imgsrc: '',
    gltfPath: '',
    initialScale: '',
    positionY: '',
    productCategory: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/productlist/addproducts', formData);
      console.log('Product added successfully:', response.data);
      alert('Product added successfully:', response.data);
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error('Error adding product:', err);
      setError('There was an error adding the product.');
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-3xl font-semibold text-center mb-6">Add New Product</h2>

      {success && <p className="text-green-600 mb-4">Product added successfully!</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="discription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="discription"
            name="discription"
            value={formData.discription}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="imgsrc" className="block text-sm font-medium text-gray-700">Image Source (URL)</label>
          <input
            type="text"
            id="imgsrc"
            name="imgsrc"
            value={formData.imgsrc}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="gltfPath" className="block text-sm font-medium text-gray-700">GLTF Path (URL)</label>
          <input
            type="text"
            id="gltfPath"
            name="gltfPath"
            value={formData.gltfPath}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="initialScale" className="block text-sm font-medium text-gray-700">Initial Scale</label>
          <input
            type="number"
            id="initialScale"
            name="initialScale"
            value={formData.initialScale}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="positionY" className="block text-sm font-medium text-gray-700">Position Y</label>
          <input
            type="number"
            id="positionY"
            name="positionY"
            value={formData.positionY}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
          <select
            id="productCategory"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Chair">Chair</option>
            <option value="Night Lamp">Night Lamp</option>
            <option value="Plant">Plant</option>
            <option value="Appliances">Appliances</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
