'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const blogPosts = [
  {
    id: '1',
    slug: 'top-10-luxury-cars-dubai-2024',
    title: 'Top 10 Luxury Cars to Rent in Dubai 2024',
    excerpt: 'Discover the most sought-after luxury vehicles available for rent in Dubai this year.',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop',
    author: 'Ahmed Al-Rashid',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Car Reviews',
    trending: true,
  },
  {
    id: '2',
    slug: 'ultimate-guide-car-rental-dubai',
    title: 'The Ultimate Guide to Car Rental in Dubai',
    excerpt: 'Everything you need to know about renting a car in Dubai, from documentation to driving rules.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    readTime: '12 min',
    category: 'Guides',
    trending: true,
  },
  {
    id: '3',
    slug: 'electric-cars-uae-future',
    title: 'Electric Cars in UAE: The Future is Here',
    excerpt: 'Explore the growing trend of electric vehicles in the UAE and what it means for car rentals.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop',
    author: 'Mohammed Al-Zahra',
    date: '2024-01-10',
    readTime: '6 min',
    category: 'Technology',
    trending: true,
  },
];

export default function HomeBlog() {
  return (
    <section className='font-montserrat relative py-24 px-6 bg-white overflow-hidden'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]'
        style={{ backgroundPosition: '0 0, 12px 12px' }}
      />

      <div className='relative max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>Latest from Our Blog</span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight'>
            News & Insights
          </h2>
          <p className='text-lg sm:text-xl text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed'>
            Stay updated with the latest trends, tips, and stories from the automotive world
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {blogPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className='group block h-full'>
                <div className='relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full flex flex-col'>
                  {/* Image */}
                  <div className='relative h-56 sm:h-64 overflow-hidden'>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent' />

                    {post.trending && (
                      <div className='absolute top-4 right-4'>
                        <Badge className='bg-amber-500/90 backdrop-blur-sm text-white border-0 shadow-lg font-semibold flex items-center gap-1'>
                          <TrendingUp className='w-3 h-3' />
                          Trending
                        </Badge>
                      </div>
                    )}

                    <div className='absolute bottom-4 left-4'>
                      <Badge className='bg-white/90 text-slate-900 border-0 font-medium'>{post.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6 flex flex-col flex-grow'>
                    <h3 className='text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
                      {post.title}
                    </h3>

                    <p className='text-slate-600 font-normal leading-relaxed mb-4 line-clamp-2 flex-grow'>
                      {post.excerpt}
                    </p>

                    <div className='flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200'>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className='w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-200' />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 group'
          >
            View All Articles
            <ArrowRight className='w-5 h-5 group-hover:translate-x-2 transition-transform duration-200' />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
