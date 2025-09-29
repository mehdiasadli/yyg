'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, TrendingUp, Filter, X, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
  views: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-luxury-cars-dubai-2024',
    title: 'Top 10 Luxury Cars to Rent in Dubai 2024',
    excerpt:
      'Discover the most sought-after luxury vehicles available for rent in Dubai this year, from Lamborghinis to Rolls-Royces.',
    content: '',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop',
    author: 'Ahmed Al-Rashid',
    authorAvatar: 'https://ui-avatars.com/api/?name=Ahmed+Al-Rashid&background=random',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Car Reviews',
    tags: ['Luxury Cars', 'Dubai', 'Rentals'],
    featured: true,
    trending: true,
    views: 15420,
  },
  {
    id: '2',
    slug: 'ultimate-guide-car-rental-dubai',
    title: 'The Ultimate Guide to Car Rental in Dubai',
    excerpt:
      'Everything you need to know about renting a car in Dubai, from documentation to driving rules and best practices.',
    content: '',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop',
    author: 'Sarah Johnson',
    authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    date: '2024-01-12',
    readTime: '12 min',
    category: 'Guides',
    tags: ['Guide', 'Dubai', 'Tips'],
    featured: true,
    trending: true,
    views: 12350,
  },
  {
    id: '3',
    slug: 'electric-cars-uae-future',
    title: 'Electric Cars in UAE: The Future is Here',
    excerpt: 'Explore the growing trend of electric vehicles in the UAE and what it means for car rental services.',
    content: '',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop',
    author: 'Mohammed Al-Zahra',
    authorAvatar: 'https://ui-avatars.com/api/?name=Mohammed+Al-Zahra&background=random',
    date: '2024-01-10',
    readTime: '6 min',
    category: 'Technology',
    tags: ['Electric Cars', 'UAE', 'Future'],
    featured: false,
    trending: true,
    views: 9870,
  },
  {
    id: '4',
    slug: 'best-family-cars-rent-dubai',
    title: 'Best Family Cars to Rent in Dubai',
    excerpt: 'Planning a family trip? Discover the most spacious and comfortable vehicles perfect for families.',
    content: '',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop',
    author: 'Fatima Hassan',
    authorAvatar: 'https://ui-avatars.com/api/?name=Fatima+Hassan&background=random',
    date: '2024-01-08',
    readTime: '7 min',
    category: 'Car Reviews',
    tags: ['Family', 'SUV', 'Safety'],
    featured: false,
    trending: false,
    views: 7650,
  },
  {
    id: '5',
    slug: 'car-maintenance-tips-dubai-heat',
    title: "Car Maintenance Tips for Dubai's Extreme Heat",
    excerpt: "Learn how to keep your car in top condition despite Dubai's harsh summer temperatures.",
    content: '',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop',
    author: 'Omar Khalid',
    authorAvatar: 'https://ui-avatars.com/api/?name=Omar+Khalid&background=random',
    date: '2024-01-05',
    readTime: '10 min',
    category: 'Maintenance',
    tags: ['Maintenance', 'Tips', 'Dubai Heat'],
    featured: false,
    trending: false,
    views: 5430,
  },
  {
    id: '6',
    slug: 'supercars-dubai-where-rent',
    title: 'Supercars in Dubai: Where to Rent the Best',
    excerpt: 'Your guide to renting supercars in Dubai, including the top models and rental locations.',
    content: '',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    author: 'Alex Martinez',
    authorAvatar: 'https://ui-avatars.com/api/?name=Alex+Martinez&background=random',
    date: '2024-01-03',
    readTime: '9 min',
    category: 'Car Reviews',
    tags: ['Supercars', 'Luxury', 'Dubai'],
    featured: true,
    trending: true,
    views: 18920,
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sort
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, categoryFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setSortBy('latest');
  };

  const hasActiveFilters = categoryFilter !== 'all' || searchQuery !== '' || sortBy !== 'latest';
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 2);

  return (
    <main className='min-h-screen pt-40 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='text-center mb-12 sm:mb-16'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>Our Blog</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            Latest News & Insights
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4'>
            Stay updated with the latest trends, tips, and stories from the automotive world
          </p>
        </motion.header>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
              {featuredPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className='group block'>
                  <motion.div
                    className='relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className='relative h-72 overflow-hidden'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent' />

                      <div className='absolute top-4 left-4 flex gap-2'>
                        <Badge className='bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg font-semibold'>
                          Featured
                        </Badge>
                        {post.trending && (
                          <Badge className='bg-amber-500/90 backdrop-blur-sm text-white border-0 shadow-lg font-semibold flex items-center gap-1'>
                            <TrendingUp className='w-3 h-3' />
                            Trending
                          </Badge>
                        )}
                      </div>

                      <div className='absolute bottom-0 left-0 right-0 p-6'>
                        <Badge className='bg-white/90 text-slate-900 border-0 mb-3 font-medium'>{post.category}</Badge>
                        <h2 className='text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200'>
                          {post.title}
                        </h2>
                      </div>
                    </div>

                    <div className='p-6'>
                      <p className='text-slate-600 font-normal leading-relaxed mb-4 line-clamp-2'>{post.excerpt}</p>

                      <div className='flex items-center justify-between text-sm text-slate-500'>
                        <div className='flex items-center gap-3'>
                          <div className='flex items-center gap-2'>
                            <User className='w-4 h-4' />
                            <span className='font-medium'>{post.author}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className='w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-200' />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search and Filters */}
        <motion.div
          className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg shadow-slate-200/50 mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
              <Input
                type='text'
                placeholder='Search articles by title, content, or tags...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-12 pr-4 py-5 sm:py-6 text-sm sm:text-base bg-white border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 rounded-xl font-normal placeholder:text-slate-400'
              />
            </div>

            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='gap-2 text-slate-700 hover:text-slate-900 whitespace-nowrap border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal transition-all duration-200 rounded-xl px-6 py-5 sm:py-6'
              >
                <Filter size={16} />
                Filters
                {hasActiveFilters && <Badge className='ml-1 text-xs bg-slate-900 text-white border-0'>Active</Badge>}
              </Button>
              {hasActiveFilters && (
                <Button
                  variant='ghost'
                  onClick={resetFilters}
                  className='gap-2 text-slate-500 hover:text-slate-700 hover:bg-red-50 text-sm whitespace-nowrap font-normal'
                >
                  <X size={14} />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='border-t border-slate-200 pt-6'
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-700'>Category</label>
                  <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                    <SelectTrigger className='w-full border-slate-200 focus:border-slate-400 rounded-xl'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Categories</SelectItem>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-700'>Sort By</label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                    <SelectTrigger className='w-full border-slate-200 focus:border-slate-400 rounded-xl'>
                      <SelectValue placeholder='Sort by' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='latest'>Latest First</SelectItem>
                      <SelectItem value='oldest'>Oldest First</SelectItem>
                      <SelectItem value='popular'>Most Popular</SelectItem>
                      <SelectItem value='trending'>Trending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Blog Grid */}
        {filteredAndSortedPosts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {filteredAndSortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className='group block h-full'>
                  <div className='relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full flex flex-col'>
                    <div className='relative h-56 overflow-hidden'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      />
                      {post.trending && (
                        <div className='absolute top-4 right-4'>
                          <Badge className='bg-amber-500/90 backdrop-blur-sm text-white border-0 shadow-lg font-semibold flex items-center gap-1'>
                            <TrendingUp className='w-3 h-3' />
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className='p-6 flex flex-col flex-grow'>
                      <Badge className='bg-slate-100 text-slate-700 border-0 mb-3 font-medium w-fit'>
                        {post.category}
                      </Badge>

                      <h3 className='text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
                        {post.title}
                      </h3>

                      <p className='text-slate-600 font-normal leading-relaxed mb-4 line-clamp-3 flex-grow'>
                        {post.excerpt}
                      </p>

                      <div className='flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='w-4 h-4' />
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='w-4 h-4' />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className='text-center py-16'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className='w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-100/50'>
              <Search className='w-12 h-12 text-blue-400' />
            </div>
            <h3 className='text-xl sm:text-2xl font-medium text-gray-900 mb-3'>No articles found</h3>
            <p className='text-gray-500 font-light mb-8 max-w-md mx-auto'>
              Try adjusting your search or filters to find what you're looking for
            </p>
            <Button
              variant='outline'
              onClick={resetFilters}
              className='gap-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal rounded-xl px-6 py-5'
            >
              <X size={16} />
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
