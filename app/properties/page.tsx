import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";

export type Property = (typeof properties)[0];

export default function PropertiesPage() {
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
