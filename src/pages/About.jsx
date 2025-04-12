import { Link } from "react-router-dom";
import { CheckCircle, FileText, Shield, Lightbulb } from "lucide-react";
import { Code, Smartphone, Boxes, Handshake, Users, Target, BadgeCheck } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="text-center py-30 bg-gradient-to-r from-gray-700 to-gray-500 text-white">
        <h1 className="text-6xl font-sans font-medium leading-tight">GT Consulting Services</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto px-6">
        A technology-driven company dedicated to delivering innovative and reliable software solutions that drive digital transformation. With a strong foundation in Web Development, Mobile App Development, and Custom Software Solutions, we empower businesses to scale, automate, and thrive in the digital age.
        </p>
      </header>

      {/* Features Section */}
      <section className="py-16 px-16 text-center">
        <h2 className="md:text-6xl font-sans font-medium leading-tight text-4xl">What We Do?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl">
            <Code className="text-blue-600 w-12 h-12 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Web Development</h3>
            <p className="mt-2 text-gray-600">Robust, responsive, and high-performing websites tailored to your needs using the latest technologies.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl">
            <Smartphone className="text-blue-600 w-12 h-12 mx-auto" />
            <h3 className="text-xl font-bold mt-4">App Development</h3>
            <p className="mt-2 text-gray-600">From Android to iOS, we design seamless, intuitive, and feature-rich mobile applications for every platform.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl">
            <Boxes className="text-blue-600 w-12 h-12 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Custom Software Solutions</h3>
            <p className="mt-2 text-gray-600">End-to-end software development services, from ideation to deployment, customized for specific business goals.</p>
          </div>
        </div>
      </section>

      {/* Who is this for? */}
      <section className="py-16 bg-gray-100 text-center px-16">
        <h2 className="md:text-6xl font-sans font-medium leading-tight text-4xl">Why Choose Us?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl">
            <Handshake className="text-blue-600 w-12 h-12 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Client-Centric Approach</h3>
            <p className="mt-2 text-gray-600">We listen, understand, and collaborate closely to ensure every product matches your vision.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl">
            <Users className="text-blue-600 w-12 h-12 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Experienced Team</h3>
            <p className="mt-2 text-gray-600">Our skilled developers, designers, and analysts bring years of industry knowledge and innovation.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl">
            <BadgeCheck className="text-blue-600 w-12 h-12 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Quality & Commitment </h3>
            <p className="mt-2 text-gray-600">From design to deployment, we focus on excellence, timely delivery, and ongoing support.</p>
          </div>
        </div>
      </section>

      {/* Call-To-Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold">Wanna be part of our skillful developers?</h2>
        <p className="mt-4 text-lg text-gray-600 px-6">Get started with our internship program today.</p>
        <Link to="/">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}
