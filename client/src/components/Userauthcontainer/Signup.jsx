
import SignUpForm from "./SignUpForm";
import Navbar from "../homecontainer/Navbar";
import Footer from "../homecontainer/Footer";

const Signup = () => {
  return (
    <>
    <Navbar />
    <div className="flex m-9 h-screen justify-center items-center">
      <div className="max-w-md w-full p-4 bg-white rounded-xl shadow-md">
        <SignUpForm />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Signup;