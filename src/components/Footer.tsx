import { ShoppingBag, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12">

          {/* About ZILUX */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="text-yellow-500" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                ZILUX
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Handmade footwear crafted with passion and precision. Where luxury meets comfort.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="text-yellow-500" />
                <span>+234 911 789 5025</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="text-yellow-500" />
                <span>immanuellaewomazino@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={20} className="text-yellow-500" />
                <span>Lugbe, Abuja</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Home
              </button>
              <button className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Products
              </button>
              <button className="block text-gray-400 hover:text-yellow-500 transition-colors">
                About Us
              </button>
              <button className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Terms & Conditions
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-yellow-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © 2026 ZILUX Handmade Footwear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}