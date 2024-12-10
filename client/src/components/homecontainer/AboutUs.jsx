// AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
      <p className="text-lg mb-4 text-gray-700">
        Welcome to RoomCraft, your ultimate destination for visualizing and designing your living spaces with cutting-edge 3D and augmented reality technology.
      </p>
      <h3 className="text-2xl font-semibold mt-4 text-gray-800">Our Mission</h3>
      <p className="mb-4 text-gray-600">
        At RoomCraft, our mission is to empower individuals to create their dream spaces by providing innovative tools that enhance the shopping experience. We believe that everyone should have access to high-quality design resources that make home improvement accessible and enjoyable.
      </p>
      <h3 className="text-2xl font-semibold mt-4 text-gray-800">What We Offer</h3>
      <ul className="list-disc list-inside mb-4 text-gray-600">
        <li>Interactive 3D product views to help you visualize items in your space.</li>
        <li>Augmented reality features that allow you to see how products fit in your home.</li>
        <li>A diverse catalog of furniture and decor items to suit every style and budget.</li>
        <li>Expert tips and resources for home design and decoration.</li>
      </ul>
      <h3 className="text-2xl font-semibold mt-4 text-gray-800">Join Us</h3>
      <p className="text-gray-600">
        Explore our platform today and start crafting the space you've always wanted. Whether you're redecorating a single room or planning a complete renovation, RoomCraft is here to help you every step of the way.
      </p>
    </div>
  );
};

export default AboutUs;