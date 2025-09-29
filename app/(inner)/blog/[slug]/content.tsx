'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy, Check, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  authorBio: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
  views: number;
}

interface BlogContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogContent({ post, relatedPosts }: BlogContentProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTitle = post.title;

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Back Button */}
      <motion.div
        className='mb-8'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href='/blog'>
          <Button
            variant='ghost'
            className='gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 font-normal'
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.article
        className='bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm mb-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Featured Image */}
        <div className='relative h-96 sm:h-[500px]'>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 896px'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent' />

          <div className='absolute bottom-0 left-0 right-0 p-8'>
            <Badge className='bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg font-semibold mb-4'>
              {post.category}
            </Badge>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight'>
              {post.title}
            </h1>
          </div>
        </div>

        {/* Article Meta */}
        <div className='p-8 border-b border-slate-200'>
          <div className='flex flex-wrap items-center gap-6 mb-6'>
            <div className='flex items-center gap-3'>
              <Image src={post.authorAvatar} alt={post.author} width={48} height={48} className='rounded-full' />
              <div>
                <p className='font-semibold text-slate-900'>{post.author}</p>
                <p className='text-sm text-slate-500'>{post.authorBio}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-6 text-sm text-slate-600'>
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='w-4 h-4' />
              <span>{post.readTime} read</span>
            </div>
            <div className='flex items-center gap-2'>
              <User className='w-4 h-4' />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className='p-8 sm:p-12 lg:p-16'>
          <div
            className='prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-600 prose-li:text-slate-600 prose-li:text-base prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className='mt-12 pt-8 border-t border-slate-200'>
            <div className='flex items-center gap-3 flex-wrap'>
              <Tag className='w-5 h-5 text-slate-400' />
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className='bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-medium cursor-pointer transition-colors duration-200'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className='mt-8 pt-8 border-t border-slate-200'>
            <div className='flex items-center justify-between flex-wrap gap-4'>
              <div className='flex items-center gap-2 text-slate-600 font-medium'>
                <Share2 className='w-5 h-5' />
                Share this article
              </div>
              <div className='flex items-center gap-3'>
                {shareUrl && (
                  <>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors duration-200'
                    >
                      <Facebook className='w-5 h-5' />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 rounded-lg bg-sky-50 hover:bg-sky-100 flex items-center justify-center text-sky-600 transition-colors duration-200'
                    >
                      <Twitter className='w-5 h-5' />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center text-indigo-600 transition-colors duration-200'
                    >
                      <Linkedin className='w-5 h-5' />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className='w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors duration-200'
                    >
                      {copied ? <Check className='w-5 h-5 text-green-600' /> : <Copy className='w-5 h-5' />}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className='p-8 bg-slate-50 border-t border-slate-200'>
          <div className='flex items-start gap-4'>
            <Image
              src={post.authorAvatar}
              alt={post.author}
              width={80}
              height={80}
              className='rounded-full flex-shrink-0'
            />
            <div>
              <p className='font-semibold text-slate-900 text-lg mb-2'>About {post.author}</p>
              <p className='text-slate-600 font-normal leading-relaxed'>{post.authorBio}</p>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-8'>Related Articles</h2>

          <div className='grid md:grid-cols-3 gap-6 sm:gap-8'>
            {relatedPosts.map((relatedPost, index) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className='group block'>
                <motion.div
                  className='bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className='relative h-48 overflow-hidden'>
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                      sizes='(max-width: 768px) 100vw, 33vw'
                    />
                  </div>

                  <div className='p-6'>
                    <Badge className='bg-slate-100 text-slate-700 border-0 mb-3 font-medium'>
                      {relatedPost.category}
                    </Badge>
                    <h3 className='text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
                      {relatedPost.title}
                    </h3>
                    <p className='text-sm text-slate-600 font-normal line-clamp-2'>{relatedPost.excerpt}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
