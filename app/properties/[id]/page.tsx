import { PropertyDetails } from '@/components/property-details';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Property } from '@/types';
import fs from 'fs/promises';
import { notFound } from 'next/navigation';
import path from 'path';

export async function generateStaticParams() {
  const propertiesJsonPath = path.join(
    process.cwd(),
    'json',
    'properties.json'
  );
  const data = await fs.readFile(propertiesJsonPath, 'utf-8');
  const properties: Property[] = JSON.parse(data);

  // Return an array of { id } objects for all property routes
  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const propertiesJsonPath = path.join(
    process.cwd(),
    'json',
    'properties.json'
  );
  const data = await fs.readFile(propertiesJsonPath, 'utf-8');
  const properties: Property[] = JSON.parse(data);

  const property = properties.find((p) => p.id === params.id);

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
