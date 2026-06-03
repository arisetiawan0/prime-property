import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, ArrowUpRight } from "lucide-react";
import { type Property } from "@/data/properties";
import { StatusBadge } from "./StatusBadge";
import { formatRupiah } from "@/lib/format";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const specs = [
    { icon: Bed, label: `${property.bedrooms} KT`, show: property.bedrooms > 0 },
    { icon: Bath, label: `${property.bathrooms} KM`, show: property.bathrooms > 0 },
    { icon: Maximize, label: `${property.areaSqm} m²`, show: property.areaSqm > 0 },
  ].filter((s) => s.show);

  return (
    <article className="group relative bg-pure-white rounded-2xl border border-pebble overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold/30 transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle bottom gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={property.status} />
        </div>
        {/* Hover "Lihat Detail" pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-charcoal text-xs font-bold tracking-wider uppercase rounded-full shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            Lihat Detail
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-charcoal leading-snug group-hover:text-gold-dark transition-colors duration-300">
            {property.name}
          </h3>
          <span className="text-[11px] font-semibold tracking-wider text-charcoal/50 uppercase shrink-0 mt-1">
            {property.type}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-4 text-charcoal/60">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
          <span className="text-sm">{property.area}</span>
        </div>

        {/* Specs */}
        {specs.length > 0 && (
          <div className="flex items-center gap-4 py-3 mb-4 border-t border-pebble text-charcoal/70">
            {specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <spec.icon
                  className="w-4 h-4 text-gold/80"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium">{spec.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="block text-[10px] font-semibold tracking-widest text-charcoal/50 uppercase mb-1">
              Harga Mulai
            </span>
            <span className="text-base font-bold text-gold-dark">
              {formatRupiah(property.price)}
            </span>
          </div>
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-pebble text-charcoal/40 group-hover:bg-gold group-hover:border-gold group-hover:text-charcoal transition-all duration-300"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Stretched link — entire card is clickable */}
      <Link
        href={`/properti/${property.id}`}
        aria-label={`Lihat detail ${property.name}`}
        className="absolute inset-0 z-10"
      />
    </article>
  );
}
