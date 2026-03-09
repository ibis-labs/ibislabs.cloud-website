import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ibis Labs LLC',
    short_name: 'Ibis Labs',
    description: 'Digital Stewardship & Architecture',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/thoth-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/thoth-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/thoth-icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
