import Hero from '@/components/home/Hero';
import ImpactTracker from '@/components/home/ImpactTracker';
import ExpectationsReality from '@/components/home/ExpectationsReality';
import TransformedLives from '@/components/home/TransformedLives';
import ExponentialResults from '@/components/home/ExponentialResults';

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <ImpactTracker />
      <ExpectationsReality />
      <TransformedLives />
      <ExponentialResults />
    </main>
  );
}
