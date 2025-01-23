import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ data
const faqData = [
  {
    question: "What is RoomCraft?",
    answer: "RoomCraft is an online platform that allows users to visualize and purchase products using immersive 3D and augmented reality experiences."
  },
  {
    question: "How do I view products in 3D?",
    answer: "You can view products in 3D by selecting any item on our website and clicking the 'View in 3D' button."
  },
  {
    question: "Can I see how a product looks in my space?",
    answer: "Yes! You can use our AR feature to visualize how products will look in your own space using your device's camera."
  },
  {
    question: "What types of products are available?",
    answer: "We offer a wide range of products including furniture, decor items, and accessories. Explore our catalog for more details."
  },
  {
    question: "Do I need an account to make a purchase?",
    answer: "Yes, creating an account is necessary to make purchases and track your orders."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards and UPI. All transactions are secure."
  },
];

// FAQItem Component
const FAQItem = ({ faq, isActive, onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <button
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-slate-900">
          {faq.question}
        </span>
        <span className="text-green-900 flex-shrink-0">
          {isActive ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>

      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isActive ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-slate-600 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">
            Everything you need to know about RoomCraft
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isActive={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default FAQ;
