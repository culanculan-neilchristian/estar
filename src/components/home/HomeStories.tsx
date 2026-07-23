import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import thumb1 from '@/assets/images/blog-thumb.jpg';
import thumb2 from '@/assets/images/blog-thumb-2.jpg';
import thumb3 from '@/assets/images/blog-thumb-3.jpg';
import thumb4 from '@/assets/images/blog-thumb-4.jpg';

const stories = [
  {
    id: 1,
    title: 'A Multilingual Breakthrough in Northern Thailand',
    desc: 'In the mountains of Northern Thailand, one small church is doing something extraordinary. What started as a single congregation has become a multilingual hub of worship, translation, and outreach, reflecting the regions diverse cultural landscape. This story follows Pastor Chai and his team as they navigate language barriers, disciple three distinct communities, and prove that the Gospel speaks every language.',
    image: thumb1,
    featured: true,
  },
  {
    id: 2,
    title: 'Light in the Highlands',
    desc: 'A young evangelist brings the Gospel to a Hmong community for the first time.',
    image: thumb2,
    featured: false,
  },
  {
    id: 3,
    title: 'From Resistance to Revival',
    desc: 'In a once-hostile village, a new believer now leads prayer meetings in her home.',
    image: thumb3,
    featured: false,
  },
  {
    id: 4,
    title: 'Baptized by Fire',
    desc: 'When monsoon rains flooded a district, the local church became a shelter — and a sanctuary.',
    image: thumb4,
    featured: false,
  }
];

export default function HomeStories() {
  const featured = stories[0];
  const regularStories = stories.slice(1);

  return (
    <section className="w-full py-20 bg-[#091f3a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
          Stories From the Field
        </h2>

        {/* Featured Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="w-full h-64 md:h-auto rounded-xl overflow-hidden relative min-h-[300px]">
            <Image src={featured.image} alt={featured.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center py-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{featured.title}</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
              {featured.desc}
            </p>
            <Link href={`/stories/${featured.id}`} className="text-sm font-semibold underline underline-offset-4 hover:text-white/80 w-fit">
              Read more
            </Link>
          </div>
        </div>

        {/* Regular Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {regularStories.map(story => (
            <div key={story.id} className="flex flex-col">
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4 relative">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
              </div>
              <h4 className="text-lg font-bold mb-2">{story.title}</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-4 flex-grow">
                {story.desc}
              </p>
              <Link href={`/stories/${story.id}`} className="text-sm font-semibold underline underline-offset-4 hover:text-white/80 w-fit">
                Read more
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/stories" className="btn-primary">
            Discover More Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
