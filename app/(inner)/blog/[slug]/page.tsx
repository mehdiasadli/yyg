import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BlogContent from './content';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

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

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-luxury-cars-dubai-2024',
    title: 'Top 10 Luxury Cars to Rent in Dubai 2024',
    excerpt:
      'Discover the most sought-after luxury vehicles available for rent in Dubai this year, from Lamborghinis to Rolls-Royces.',
    content: `
      <p>Dubai is synonymous with luxury, and nothing epitomizes this better than the stunning array of high-end vehicles available for rent throughout the city. In 2024, the luxury car rental market in Dubai continues to thrive, offering an impressive selection of vehicles that cater to discerning tastes and preferences.</p>

      <h2>1. Lamborghini Huracán</h2>
      <p>The Lamborghini Huracán remains one of the most popular choices for luxury car enthusiasts. With its aggressive styling, powerful V10 engine, and exhilarating performance, it's perfect for those wanting to make a statement on Dubai's streets.</p>

      <h2>2. Rolls-Royce Phantom</h2>
      <p>For those seeking the pinnacle of luxury and comfort, the Rolls-Royce Phantom is unmatched. Its handcrafted interior and smooth, powerful ride make it ideal for special occasions and business meetings.</p>

      <h2>3. Ferrari 488 GTB</h2>
      <p>Ferrari's 488 GTB combines stunning Italian design with breathtaking performance. Its twin-turbo V8 engine delivers an unforgettable driving experience on Dubai's highways.</p>

      <h2>4. Bentley Continental GT</h2>
      <p>The perfect blend of performance and luxury, the Continental GT offers a refined driving experience with its powerful W12 engine and sumptuous interior.</p>

      <h2>5. Porsche 911 Turbo S</h2>
      <p>A true sports car icon, the 911 Turbo S offers incredible performance while maintaining everyday usability. It's a favorite among driving enthusiasts visiting Dubai.</p>

      <h2>Conclusion</h2>
      <p>Whether you're visiting Dubai for business or pleasure, renting a luxury car elevates your experience. With YAYAGO's extensive fleet and 0% commission model, accessing these dream machines has never been easier or more affordable.</p>
    `,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop',
    author: 'Ahmed Al-Rashid',
    authorAvatar: 'https://ui-avatars.com/api/?name=Ahmed+Al-Rashid&background=random',
    authorBio: 'Automotive journalist and luxury car enthusiast with over 10 years of experience in the UAE market.',
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
    content: `
      <p>Renting a car in Dubai is one of the best ways to explore the city and its surroundings. This comprehensive guide covers everything you need to know to make your car rental experience smooth and hassle-free.</p>

      <h2>Required Documentation</h2>
      <p>To rent a car in Dubai, you'll need:</p>
      <ul>
        <li>Valid UAE driving license or International Driving Permit</li>
        <li>Emirates ID or passport</li>
        <li>Valid credit card in your name</li>
        <li>Minimum age of 21 years (25 for luxury cars)</li>
      </ul>

      <h2>Understanding Dubai's Road Rules</h2>
      <p>Dubai has strict traffic regulations. Speed limits are clearly marked, and there's zero tolerance for drinking and driving. Always wear your seatbelt and follow traffic signals.</p>

      <h2>Best Areas to Drive</h2>
      <p>Dubai's road infrastructure is world-class. Popular routes include Sheikh Zayed Road, Jumeirah Beach Road, and the scenic drive to Abu Dhabi.</p>

      <h2>Parking Tips</h2>
      <p>Most areas in Dubai have paid parking. Download the RTA Dubai Drive app to pay for parking easily. Mall parking is usually free for the first few hours.</p>

      <h2>Conclusion</h2>
      <p>With proper preparation and knowledge, renting a car in Dubai can greatly enhance your experience in this magnificent city.</p>
    `,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop',
    author: 'Sarah Johnson',
    authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    authorBio: 'Travel writer and Dubai resident, passionate about helping visitors navigate the city.',
    date: '2024-01-12',
    readTime: '12 min',
    category: 'Guides',
    tags: ['Guide', 'Dubai', 'Tips'],
    featured: true,
    trending: true,
    views: 12350,
  },
];

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className='min-h-screen pt-40 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center py-24'>
            <h1 className='text-4xl font-semibold text-slate-900 mb-4'>Article Not Found</h1>
            <p className='text-slate-600 font-normal mb-8'>The article you're looking for doesn't exist.</p>
            <Link href='/blog'>
              <Button className='gap-2 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/25 rounded-xl px-6 py-5'>
                <ArrowLeft size={16} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen pt-40 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20'>
      <Suspense
        fallback={
          <div className='max-w-4xl mx-auto px-6'>
            <div className='h-screen flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-16 h-16 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mx-auto mb-4' />
                <p className='text-slate-600'>Loading...</p>
              </div>
            </div>
          </div>
        }
      >
        <BlogContent
          post={post}
          relatedPosts={blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)}
        />
      </Suspense>
    </main>
  );
}
