import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

export default async function PropertiesPage() {
  const properties = await fetchProperties();

  // sort properties by (descending) date
  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </div>
    </section>
  );
}
