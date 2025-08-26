import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Code, Terminal, Mail } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

const SoftwareFooter: React.FC = () => {
  const { currentStore } = useStore();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{currentStore?.name || 'Software Platform'}</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering developers with cutting-edge software solutions and tools for modern development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Software</Link></li>
              <li><Link to="/products?category=development" className="text-gray-400 hover:text-white transition-colors">Development Tools</Link></li>
              <li><Link to="/products?category=analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/products?category=security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/products?category=cloud" className="text-gray-400 hover:text-white transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400">dev@{currentStore?.domain}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400">API Support</span>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-white">Support Hours</h5>
              <p className="text-gray-400 text-sm">
                24/7 Online Support<br />
                Live Chat Available
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 {currentStore?.name || 'Software Platform'}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/licenses" className="text-gray-400 hover:text-white text-sm transition-colors">
                Licenses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SoftwareFooter;