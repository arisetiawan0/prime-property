export type PropertyStatus = "in_stock" | "sold_out" | "siap_huni" | "siap_kosong";

export interface Property {
  id: string;
  name: string;
  area: string;
  address: string;
  price: number;
  type: string;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  certificate: string;
  yearBuilt: number;
  description: string;
  imageUrl: string;
  imageAlt: string;
  gallery: string[];
}

export const properties: Property[] = [
  {
    id: "villa-serenity",
    name: "Villa Serenity",
    area: "Kawasan Elit Selatan",
    address: "Jl. Bukit Damai No. 12, Sentul, Bogor",
    price: 5_500_000_000,
    type: "Villa",
    status: "in_stock",
    bedrooms: 5,
    bathrooms: 4,
    areaSqm: 450,
    certificate: "SHM",
    yearBuilt: 2022,
    description:
      "Villa Serenity adalah representasi sempurna dari kemewahan yang tenang, dirancang oleh arsitek ternama dengan filosofi ruang terbuka dan pencahayaan alami. Setiap sudut properti ini memancarkan keanggunan — mulai dari foyer marmer Italia, ruang keluarga dengan langit-langit tinggi, hingga kolam renang infinity yang menyatu dengan panorama perbukitan. Dilengkapi lima kamar tidur suite, dapur terbuka dengan island table, serta taman lanskap tropis yang terawat, Villa Serenity adalah sanctuary yang memadukan privasi, kenyamanan, dan prestise dalam satu harmoni.",
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Villa modern dengan kolam renang dan taman hijau",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "ruko-bisnis-prime",
    name: "Ruko Bisnis Prime",
    area: "Pusat Bisnis Utara",
    address: "Jl. Sudirman Kav. 45, Jakarta Pusat",
    price: 3_200_000_000,
    type: "Ruko",
    status: "sold_out",
    bedrooms: 0,
    bathrooms: 3,
    areaSqm: 280,
    certificate: "HGB",
    yearBuilt: 2021,
    description:
      "Ruko Bisnis Prime berada di jantung distrik komersial Jakarta, menawarkan visibilitas tinggi dan aksesibilitas tanpa kompromi. Bangunan tiga lantai dengan fasad kaca tempered ini dirancang untuk mengakomodasi berbagai jenis usaha — dari kantor profesional, butik eksklusif, hingga klinik spesialis. Setiap lantai memiliki tata letak fleksibel, sistem HVAC sentral, dan dedicated line untuk teknologi. Investasi ideal bagi Anda yang mengincar properti komersial dengan potensi okupansi tinggi dan apresiasi nilai jangka panjang.",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Ruko komersial modern dengan fasad minimalis",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "residensi-harmoni",
    name: "Residensi Harmoni",
    area: "Kawasan Hijau Timur",
    address: "Cluster Harmoni Hijau, Cibubur, Jakarta Timur",
    price: 2_800_000_000,
    type: "Rumah",
    status: "siap_huni",
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 320,
    certificate: "SHM",
    yearBuilt: 2023,
    description:
      "Residensi Harmoni adalah jawaban bagi keluarga modern yang mendambakan keseimbangan antara kehidupan urban dan kedamaian alam. Berlokasi di cluster hijau dengan sistem satu gerbang, rumah dua lantai ini memadukan desain kontemporer yang hangat dengan material premium — kayu oak, marmer Calacatta, dan kaca floor-to-ceiling. Empat kamar tidur, ruang keluarga terbuka yang menyatu dengan taman belakang, serta garasi untuk dua kendaraan menjadikan Residensi Harmoni tempat di mana setiap momen keluarga terasa bermakna.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Rumah tinggal modern dengan halaman luas",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "oasis-townhouse",
    name: "Oasis Townhouse",
    area: "Pusat Kota Selatan",
    address: "Jl. Kemang Raya No. 88, Jakarta Selatan",
    price: 4_100_000_000,
    type: "Townhouse",
    status: "in_stock",
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 260,
    certificate: "SHM",
    yearBuilt: 2022,
    description:
      "Oasis Townhouse merepresentasikan urban living yang sophisticated — di mana setiap meter persegi dirancang untuk memaksimalkan fungsi tanpa mengorbankan estetika. Tiga lantai dengan private rooftop, empat kamar tidur suite, dapur terbuka dengan pantry, serta ruang kerja khusus menciptakan ritme hidup yang ideal bagi profesional dan keluarga kecil. Lokasinya yang strategis di Kemang menjadikan Oasis Townhouse investasi yang tak lekang oleh waktu, dikelilingi kuliner, galeri seni, dan lifestyle hub terbaik Jakarta.",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Townhouse elegan dengan desain kontemporer",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "apartemen-panorama",
    name: "Apartemen Panorama",
    area: "Distrik Sentral",
    address: "SCBD Lot 12, Jl. Jend. Sudirman, Jakarta Selatan",
    price: 6_500_000_000,
    type: "Apartemen",
    status: "siap_kosong",
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 210,
    certificate: "HGB",
    yearBuilt: 2024,
    description:
      "Apartemen Panorama adalah pinnacle of high-rise luxury di jantung SCBD, menempati lantai premium dengan view 360° skyline Jakarta. Interior dirancang oleh desainer interior internasional, menggabungkan furnitur bespoke dengan material terbaik. Tiga kamar tidur dengan walk-in closet, dapur chef-grade dengan peralatan Miele, serta akses eksklusif ke sky lounge, infinity pool di lantai 50, dan private elevator. Bagi Anda yang menghargai privacy, prestise, dan koneksi langsung ke pusat bisnis — Apartemen Panorama adalah standar baru.",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Apartemen mewah dengan pemandangan kota",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "kavling-eksklusif",
    name: "Kavling Eksklusif",
    area: "Bukit Permata",
    address: "Kawasan Bukit Permata, Cisarua, Puncak",
    price: 1_500_000_000,
    type: "Tanah",
    status: "sold_out",
    bedrooms: 0,
    bathrooms: 0,
    areaSqm: 800,
    certificate: "SHM",
    yearBuilt: 0,
    description:
      "Kavling Eksklusif adalah kanvas kosong bagi Anda yang bermimpi membangun rumah sesuai visi pribadi, di lokasi yang sulit ditandingi. Berada di ketinggian 1.200 mdpl dengan udara sejuk pegunungan dan view langsung ke arah Gunung Gede-Pangrango, kavling ini dikelilingi oleh community eksklusif dengan infrastruktur modern — jalan aspal lebar, sistem keamanan 24 jam, dan utilitas underground. Investasi jangka panjang yang nilainya terus meningkat seiring dengan berkembangnya kawasan Puncak sebagai destinasi premium.",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Kavling tanah di lingkungan premium dengan pepohonan rindang",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

export const statusConfig: Record<
  PropertyStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  in_stock: {
    label: "Tersedia",
    bgClass: "bg-status-stock-bg",
    textClass: "text-status-stock-text",
  },
  sold_out: {
    label: "Terjual",
    bgClass: "bg-charcoal/90 backdrop-blur-sm",
    textClass: "text-cream",
  },
  siap_huni: {
    label: "Siap Huni",
    bgClass: "bg-status-huni-bg",
    textClass: "text-status-huni-text",
  },
  siap_kosong: {
    label: "Siap Kosong",
    bgClass: "bg-status-kosong-bg",
    textClass: "text-status-kosong-text",
  },
};

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.id === slug);
}
