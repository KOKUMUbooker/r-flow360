import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PropertyDetails } from '@/components/property-details';
import { dummyProperties } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const property = dummyProperties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PropertyDetails property={property} />
      </main>
      <SiteFooter />
    </div>
  );
}
