import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YayaGo',
    short_name: 'YayaGo',
    description: 'YayaGo is Dubai’s premium car-sharing and auto-service platform.',
    start_url: '/',
    display: 'standalone',
  };
}
