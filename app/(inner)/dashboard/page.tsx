'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Car, DollarSign, Calendar, Users, Star, Eye, Plus, Filter, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// Mock dashboard data
const dashboardData = {
  stats: {
    totalEarnings: 15420,
    monthlyEarnings: 2840,
    activeListings: 3,
    totalBookings: 47,
    averageRating: 4.8,
    responseRate: 98,
  },
  recentBookings: [
    {
      id: 'BK001',
      car: '2023 BMW X5',
      renter: 'Sarah Johnson',
      startDate: '2024-01-20',
      endDate: '2024-01-23',
      amount: 850,
      status: 'upcoming',
    },
    {
      id: 'BK002',
      car: '2022 Mercedes C-Class',
      renter: 'Ahmed Al-Rashid',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      amount: 650,
      status: 'completed',
    },
    {
      id: 'BK003',
      car: '2023 BMW X5',
      renter: 'Emma Wilson',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      amount: 450,
      status: 'completed',
    },
  ],
  monthlyData: [
    { month: 'Sep', earnings: 1240 },
    { month: 'Oct', earnings: 1890 },
    { month: 'Nov', earnings: 2150 },
    { month: 'Dec', earnings: 2840 },
    { month: 'Jan', earnings: 3200 },
  ],
};

const quickActions = [
  {
    icon: <Plus className='w-5 h-5' />,
    title: 'Add New Listing',
    description: 'List another vehicle for rent',
    link: '/listing',
    primary: true,
  },
  {
    icon: <Car className='w-5 h-5' />,
    title: 'Manage Listings',
    description: 'Edit your existing car listings',
    link: '/my-listings',
    primary: false,
  },
  {
    icon: <Calendar className='w-5 h-5' />,
    title: 'View Bookings',
    description: 'Check upcoming and past rentals',
    link: '/my-bookings',
    primary: false,
  },
  {
    icon: <Download className='w-5 h-5' />,
    title: 'Download Report',
    description: 'Export earnings and booking data',
    link: '#',
    primary: false,
  },
];

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState('month');

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='mb-12'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight'>
                Dashboard
              </h1>
              <p className='text-lg text-gray-500 font-light leading-relaxed'>
                Track your earnings, manage listings, and view booking analytics
              </p>
            </div>
            <div className='mt-6 md:mt-0 flex gap-3'>
              <Button
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light'
              >
                <Filter size={16} />
                Filter
              </Button>
              <Button
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light'
              >
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                title: 'Total Earnings',
                value: `${dashboardData.stats.totalEarnings.toLocaleString()} AED`,
                change: '+12.5%',
                icon: <DollarSign className='w-6 h-6' />,
                positive: true,
              },
              {
                title: 'This Month',
                value: `${dashboardData.stats.monthlyEarnings.toLocaleString()} AED`,
                change: '+8.2%',
                icon: <TrendingUp className='w-6 h-6' />,
                positive: true,
              },
              {
                title: 'Active Listings',
                value: dashboardData.stats.activeListings.toString(),
                change: 'No change',
                icon: <Car className='w-6 h-6' />,
                positive: null,
              },
              {
                title: 'Total Bookings',
                value: dashboardData.stats.totalBookings.toString(),
                change: '+15.3%',
                icon: <Calendar className='w-6 h-6' />,
                positive: true,
              },
              {
                title: 'Average Rating',
                value: `${dashboardData.stats.averageRating}/5`,
                change: '+0.2',
                icon: <Star className='w-6 h-6' />,
                positive: true,
              },
              {
                title: 'Response Rate',
                value: `${dashboardData.stats.responseRate}%`,
                change: '+2%',
                icon: <Users className='w-6 h-6' />,
                positive: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600'>
                    {stat.icon}
                  </div>
                  {stat.positive !== null && (
                    <Badge
                      className={`text-xs font-light ${
                        stat.positive
                          ? 'bg-green-50 text-green-700 border-0'
                          : 'bg-red-50 text-red-700 border-0'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <h3 className='text-sm font-light text-gray-600 mb-2'>{stat.title}</h3>
                <p className='text-2xl font-light text-gray-900'>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Chart Section */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <div className='flex items-center justify-between mb-8'>
              <h3 className='text-xl font-light text-gray-900'>Earnings Overview</h3>
              <div className='flex gap-2'>
                {['week', 'month', 'year'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 text-sm font-light rounded-lg transition-colors ${
                      timeFilter === filter
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple bar chart representation */}
            <div className='flex items-end justify-between h-64 gap-4'>
              {dashboardData.monthlyData.map((data, index) => (
                <div key={data.month} className='flex flex-col items-center flex-1'>
                  <div
                    className='w-full bg-gray-900 rounded-t-lg transition-all duration-500 hover:bg-gray-700'
                    style={{
                      height: `${(data.earnings / Math.max(...dashboardData.monthlyData.map(d => d.earnings))) * 200}px`,
                    }}
                  />
                  <div className='mt-3 text-center'>
                    <p className='text-xs text-gray-400 font-light'>{data.month}</p>
                    <p className='text-sm font-light text-gray-900'>{data.earnings} AED</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-xl font-light text-gray-900 mb-6'>Quick Actions</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={action.link}>
                    <div className={`p-6 border rounded-lg transition-all duration-300 group cursor-pointer ${
                      action.primary
                        ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
                        : 'border-gray-50 hover:shadow-md'
                    }`}>
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                        action.primary
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                      }`}>
                        {action.icon}
                      </div>
                      <h4 className={`text-lg font-light mb-2 transition-colors ${
                        action.primary
                          ? 'text-white'
                          : 'text-gray-900 group-hover:text-gray-700'
                      }`}>
                        {action.title}
                      </h4>
                      <p className={`text-sm font-light leading-relaxed ${
                        action.primary
                          ? 'text-white/80'
                          : 'text-gray-500'
                      }`}>
                        {action.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Recent Bookings */}
        <motion.section
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-light text-gray-900'>Recent Bookings</h3>
              <Link href='/my-bookings'>
                <Button variant='outline' className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                  <Eye size={16} />
                  View All
                </Button>
              </Link>
            </div>

            <div className='space-y-4'>
              {dashboardData.recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  className='flex items-center justify-between p-6 border border-gray-50 rounded-lg hover:shadow-md transition-all duration-300'
                  whileHover={{ y: -1 }}
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                      <Car className='w-6 h-6 text-gray-600' />
                    </div>
                    <div>
                      <h4 className='font-light text-gray-900 mb-1'>{booking.car}</h4>
                      <p className='text-sm text-gray-500 font-light'>Rented by {booking.renter}</p>
                      <p className='text-xs text-gray-400 font-light'>
                        {booking.startDate} - {booking.endDate}
                      </p>
                    </div>
                  </div>

                  <div className='text-right'>
                    <p className='text-lg font-light text-gray-900 mb-1'>{booking.amount} AED</p>
                    <Badge
                      className={`text-xs font-light ${
                        booking.status === 'upcoming'
                          ? 'bg-blue-50 text-blue-700 border-0'
                          : 'bg-green-50 text-green-700 border-0'
                      }`}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}