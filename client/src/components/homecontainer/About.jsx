import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  const features = [
    {
      title: "3D Visualization",
      description: "Experience furniture in stunning 3D detail before purchase",
      icon: "🎮"
    },
    {
      title: "AR Technology",
      description: "Place furniture in your space using augmented reality",
      icon: "📱"
    },
    {
      title: "Curated Collection",
      description: "Handpicked premium furniture and decor items",
      icon: "✨"
    }
  ];

  const team = [
    {
      name: "Rajan Dhariyaparmar",
      role: "UI/UX Designer And MERN Stack Developer",
      image: "/image/myimage.jpg"
    },
    {
      name: "Yash Kankoshiya",
      role: "Node js Developer",
      image: "/image/myimage2.jpg"
    }
  ];

  return (
    <div>
      <Navbar/>
      {/* Hero Section */}
      <div className="bg-[#0A3622] text-white mt-16 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Transforming Spaces Into Dreams</h1>
          <p className="text-xl max-w-2xl">
            At RoomCraft, we blend innovation with elegance, offering immersive 3D and AR 
            experiences to help you visualize your perfect living space before making it a reality.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#0A3622]/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0A3622] mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                We're on a mission to revolutionize how people shop for furniture and home decor. 
                By combining cutting-edge technology with exceptional design, we make it easier 
                than ever to create your dream living space.
              </p>
              <p className="text-gray-700">
                Our commitment to sustainability and quality ensures that every piece not only 
                looks beautiful but also stands the test of time, contributing to a more 
                sustainable future for home furnishing.
              </p>
            </div>
            <div className="bg-[#0A3622] p-8 rounded-lg text-white">
              <h3 className="text-2xl font-semibold mb-4">Why Choose RoomCraft?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Immersive 3D & AR Experience
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Premium Quality Furniture
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Sustainable Materials
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Expert Design Consultation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-[#0A3622]/20">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#0A3622] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0A3622] mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8 ">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-[#0A3622]">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
