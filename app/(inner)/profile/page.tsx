'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Camera, Check, X, Bell, Lock, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

// Mock user data
const userData = {
  firstName: 'Ahmed',
  lastName: 'Al-Rashid',
  email: 'ahmed.alrashid@email.com',
  phone: '+971 50 123 4567',
  location: 'Dubai Marina, Dubai',
  joinDate: '2023-06-15',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  verificationStatus: {
    email: true,
    phone: true,
    identity: true,
    license: true,
  },
  stats: {
    totalRentals: 24,
    totalEarnings: 15420,
    rating: 4.9,
    responseRate: 98,
  },
};

const quickActions = [
  {
    icon: <Bell className='w-5 h-5' />,
    title: 'Notifications',
    description: 'Manage your notification preferences',
    link: '/profile/notifications',
  },
  {
    icon: <Lock className='w-5 h-5' />,
    title: 'Privacy & Security',
    description: 'Update password and security settings',
    link: '/profile/security',
  },
  {
    icon: <CreditCard className='w-5 h-5' />,
    title: 'Payment Methods',
    description: 'Manage your payment and payout methods',
    link: '/profile/payments',
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
  });

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
    });
    setIsEditing(false);
  };

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-4xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='text-center py-16 mb-12'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight'>
            My Profile
          </h1>
          <p className='text-lg text-gray-500 font-light leading-relaxed'>
            Manage your account information and preferences
          </p>
        </motion.header>

        {/* Profile Card */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <div className='flex flex-col md:flex-row gap-8'>
              {/* Profile Image */}
              <div className='flex flex-col items-center'>
                <div className='relative group'>
                  <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100'>
                    <Image
                      src={userData.profileImage}
                      alt={`${userData.firstName} ${userData.lastName}`}
                      width={128}
                      height={128}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <button className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <Camera className='w-6 h-6 text-white' />
                  </button>
                </div>
                <p className='text-xs text-gray-400 font-light mt-2'>Click to change photo</p>
              </div>

              {/* Profile Information */}
              <div className='flex-grow'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-light text-gray-900'>Personal Information</h2>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant='outline'
                      className='gap-2 border-gray-200 hover:border-gray-300 font-light'
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className='flex gap-2'>
                      <Button
                        onClick={handleSave}
                        className='gap-2 bg-gray-900 hover:bg-gray-800 text-white font-light'
                      >
                        <Check size={16} />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant='outline'
                        className='gap-2 border-gray-200 hover:border-gray-300 font-light'
                      >
                        <X size={16} />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-light text-gray-600 mb-2'>First Name</label>
                      {isEditing ? (
                        <Input
                          value={editData.firstName}
                          onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                          className='border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                        />
                      ) : (
                        <p className='text-gray-900 font-light'>{userData.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-light text-gray-600 mb-2'>Email</label>
                      {isEditing ? (
                        <Input
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className='border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                        />
                      ) : (
                        <div className='flex items-center gap-2'>
                          <p className='text-gray-900 font-light'>{userData.email}</p>
                          {userData.verificationStatus.email && (
                            <Badge className='bg-green-50 text-green-700 border-0 text-xs font-light'>
                              Verified
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-light text-gray-600 mb-2'>Location</label>
                      {isEditing ? (
                        <Input
                          value={editData.location}
                          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                          className='border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                        />
                      ) : (
                        <p className='text-gray-900 font-light'>{userData.location}</p>
                      )}
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-light text-gray-600 mb-2'>Last Name</label>
                      {isEditing ? (
                        <Input
                          value={editData.lastName}
                          onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                          className='border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                        />
                      ) : (
                        <p className='text-gray-900 font-light'>{userData.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-light text-gray-600 mb-2'>Phone</label>
                      {isEditing ? (
                        <Input
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className='border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                        />
                      ) : (
                        <div className='flex items-center gap-2'>
                          <p className='text-gray-900 font-light'>{userData.phone}</p>
                          {userData.verificationStatus.phone && (
                            <Badge className='bg-green-50 text-green-700 border-0 text-xs font-light'>
                              Verified
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-light text-gray-600 mb-2'>Member Since</label>
                      <p className='text-gray-900 font-light'>
                        {new Date(userData.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Verification Status */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-xl font-light text-gray-900 mb-6'>Verification Status</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                { key: 'email', label: 'Email Address', icon: <Mail className='w-5 h-5' /> },
                { key: 'phone', label: 'Phone Number', icon: <Phone className='w-5 h-5' /> },
                { key: 'identity', label: 'Identity Document', icon: <User className='w-5 h-5' /> },
                { key: 'license', label: 'Driving License', icon: <Shield className='w-5 h-5' /> },
              ].map((item) => (
                <div key={item.key} className='flex items-center gap-3 p-4 border border-gray-50 rounded-lg'>
                  <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600'>
                    {item.icon}
                  </div>
                  <div className='flex-grow'>
                    <p className='text-sm font-light text-gray-900'>{item.label}</p>
                    <div className='flex items-center gap-2 mt-1'>
                      {userData.verificationStatus[item.key as keyof typeof userData.verificationStatus] ? (
                        <Badge className='bg-green-50 text-green-700 border-0 text-xs font-light'>
                          Verified
                        </Badge>
                      ) : (
                        <Badge className='bg-orange-50 text-orange-700 border-0 text-xs font-light'>
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Account Statistics */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-xl font-light text-gray-900 mb-6'>Account Statistics</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='text-3xl font-light text-gray-900 mb-2'>{userData.stats.totalRentals}</div>
                <p className='text-sm text-gray-500 font-light'>Total Rentals</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-light text-gray-900 mb-2'>{userData.stats.totalEarnings.toLocaleString()} AED</div>
                <p className='text-sm text-gray-500 font-light'>Total Earnings</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-light text-gray-900 mb-2'>{userData.stats.rating}/5</div>
                <p className='text-sm text-gray-500 font-light'>Average Rating</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-light text-gray-900 mb-2'>{userData.stats.responseRate}%</div>
                <p className='text-sm text-gray-500 font-light'>Response Rate</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-xl font-light text-gray-900 mb-6'>Quick Actions</h3>
            <div className='grid md:grid-cols-3 gap-6'>
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='p-6 border border-gray-50 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group'>
                    <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 mb-4 group-hover:bg-gray-200 transition-colors'>
                      {action.icon}
                    </div>
                    <h4 className='text-lg font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                      {action.title}
                    </h4>
                    <p className='text-sm text-gray-500 font-light leading-relaxed'>
                      {action.description}
                    </p>
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