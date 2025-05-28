import PlaceholderImage from './PlaceholderImage';

const images = [
  { src: '/content/naruto.jpg', title: 'Naruto' },
  { src: '/content/onepiece.jpg', title: 'One Piece' },
  { src: '/content/demonslayer.jpg', title: 'Demon Slayer' },
  { src: '/content/kaiju8.jpg', title: 'Kaiju No. 8' },
  { src: '/content/fate.jpg', title: 'Fate' },
  { src: '/content/fate1.jpg', title: 'Fate 1' },
  { src: '/content/taktop.jpg', title: 'Takt Op' },
];

export default function PlaceholderImageGallery() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {images.map((img) => (
        <PlaceholderImage
          key={img.src}
          title={img.title}
          imageSrc={img.src}
        />
      ))}
    </section>
  );
} 