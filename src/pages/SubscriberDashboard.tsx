import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Settings, 
  CreditCard, 
  HelpCircle,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  MessageSquare,
  Building
} from 'lucide-react';
import Button from '../components/ui/Button';

const SubscriberDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Mock data for the dashboard
  const stats = [
    { title: 'Total Users', value: '1,284', icon: Users, change: '+12%', changeType: 'positive' },
    { title: 'Revenue', value: '$12,543', icon: CreditCard, change: '+23%', changeType: 'positive' },
    { title: 'Active Products', value: '32', icon: ShoppingBag, change: '+5', changeType: 'positive' },
    { title: 'Support Tickets', value: '5', icon: MessageSquare, change: '-2', changeType: 'positive' },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', user: 'John Doe' },
    { id: 2, action: 'New order placed', time: '1 hour ago', user: 'Jane Smith' },
    { id: 3, action: 'Payment received', time: '3 hours ago', user: 'Robert Johnson' },
    { id: 4, action: 'Product updated', time: '5 hours ago', user: 'Admin' },
    { id: 5, action: 'New review received', time: '1 day ago', user: 'Michael Brown' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-white shadow-lg z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Subscriber</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/subscriber-dashboard" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-primary-50 rounded-lg font-medium"
                >
                  <Home className="h-5 w-5 text-primary-600" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-users" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-analytics" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <BarChart3 className="h-5 w-5 text-gray-500" />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-products" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <ShoppingBag className="h-5 w-5 text-gray-500" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-billing" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span>Billing</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-reports" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-settings" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/subscriber-support" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  <HelpCircle className="h-5 w-5 text-gray-500" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-4 py-4 border-t">
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                JD
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => console.log('Logout clicked')}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Subscriber Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="relative text-gray-500 hover:text-gray-700">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                  <stat.icon className="h-6 w-6 text-primary-500" />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Activity
              </Button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Add New User</span>
                </Button>
                <Button variant="outline" size="md" className="w-full flex items-center justify-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add New Product</span>
                </Button>
                <Button variant="outline" size="md" className="w-full flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Generate Report</span>
                </Button>
                <Button variant="outline" size="md" className="w-full flex items-center justify-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-800 mb-2">Subscription Status</h3>
                <p className="text-sm text-primary-700 mb-3">Your premium plan expires in 25 days</p>
                <Button variant="primary" size="sm" className="w-full">
                  Renew Subscription
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriberDashboard;