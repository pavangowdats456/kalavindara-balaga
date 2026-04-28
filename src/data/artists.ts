import dollu from "@/assets/hero-dollu.jpg";
import pooja from "@/assets/art-pooja.jpg";
import yaksha from "@/assets/art-yakshagana.jpg";
import veera from "@/assets/art-veeragase.jpg";
import kamsale from "@/assets/art-kamsale.jpg";
import nagari from "@/assets/art-nagari.jpg";
import suggi from "@/assets/art-suggi.jpg";

export const ART_FORMS = [
  "Dollu Kunitha",
  "Pooja Kunitha",
  "Yakshagana",
  "Veeragase",
  "Kamsale",
  "Nagari Drums",
  "Suggi Kunitha",
] as const;

export const DISTRICTS = [
  "Bengaluru",
  "Mysuru",
  "Tumakuru",
  "Mandya",
  "Hassan",
  "Shivamogga",
  "Udupi",
  "Davanagere",
  "Chitradurga",
  "Belagavi",
] as const;

export type ArtForm = (typeof ART_FORMS)[number];
export type District = (typeof DISTRICTS)[number];

export interface Artist {
  id: string;
  groupName: string;
  artForm: ArtForm;
  district: District;
  members: number;
  experienceYears: number;
  image: string;
  gallery: string[];
  bio: string;
  equipment: string[];
  startingPrice: number;
  rating: number;
  bookings: number;
  phone: string;
  leader: string;
}

export const ARTISTS: Artist[] = [
  {
    id: "1",
    groupName: "Sri Mahalakshmi Dollu Kunitha Tanda",
    leader: "Mahadevappa",
    artForm: "Dollu Kunitha",
    district: "Tumakuru",
    members: 14,
    experienceYears: 22,
    image: dollu,
    gallery: [dollu, nagari, veera, kamsale],
    bio: "A celebrated troupe carrying the thunderous Dollu rhythms of Tumakuru for three generations. Performed at over 400 weddings, temple jatras and government cultural events across Karnataka.",
    equipment: ["14 traditional Dollu drums", "Costumes & turbans", "Portable JBL sound system", "Cordless mics"],
    startingPrice: 18000,
    rating: 4.9,
    bookings: 412,
    phone: "+919845012345",
  },
  {
    id: "2",
    groupName: "Banashankari Pooja Kunitha Mela",
    leader: "Lakshmamma",
    artForm: "Pooja Kunitha",
    district: "Mandya",
    members: 10,
    experienceYears: 18,
    image: pooja,
    gallery: [pooja, suggi, dollu, kamsale],
    bio: "An auspicious all-women troupe specialising in Pooja Kunitha — the temple-procession dance balancing decorated wooden shrines on the head. A blessing for weddings and house-warmings.",
    equipment: ["6 hand-carved Pooja shrines", "Marigold garlands", "Brass jagate, talas", "Traditional sarees"],
    startingPrice: 15000,
    rating: 4.8,
    bookings: 230,
    phone: "+919845022345",
  },
  {
    id: "3",
    groupName: "Saraswathi Yakshagana Mandali",
    leader: "Ganapathi Bhat",
    artForm: "Yakshagana",
    district: "Udupi",
    members: 16,
    experienceYears: 35,
    image: yaksha,
    gallery: [yaksha, veera, dollu, nagari],
    bio: "Coastal Karnataka’s living theatre. Full-night Prasanga performances with painted faces, towering kireeta crowns, chande and maddale. Bookings open across India.",
    equipment: ["Costumes & kireeta crowns", "Chande, maddale, harmonium", "Stage lighting rig", "Bhagavata vocalist"],
    startingPrice: 45000,
    rating: 5.0,
    bookings: 180,
    phone: "+919845032345",
  },
  {
    id: "4",
    groupName: "Veerabhadra Veeragase Tanda",
    leader: "Shivakumar",
    artForm: "Veeragase",
    district: "Shivamogga",
    members: 8,
    experienceYears: 15,
    image: veera,
    gallery: [veera, dollu, kamsale, nagari],
    bio: "Fierce devotional dance of Lord Veerabhadra. Sword-wielding performers in trance, perfect for processions, Shivaratri events and corporate cultural showcases.",
    equipment: ["Ceremonial swords", "Rudraksha & ornaments", "Damaru, sankha, jagate", "Red dhotis"],
    startingPrice: 12000,
    rating: 4.7,
    bookings: 156,
    phone: "+919845042345",
  },
  {
    id: "5",
    groupName: "Mahadeshwara Kamsale Balaga",
    leader: "Madeva",
    artForm: "Kamsale",
    district: "Mysuru",
    members: 7,
    experienceYears: 28,
    image: kamsale,
    gallery: [kamsale, dollu, suggi, pooja],
    bio: "Devotees of Male Mahadeshwara performing the brass-cymbal Kamsale dance. Hypnotic rhythms passed down through Jangama lineage of Mysuru region.",
    equipment: ["Brass Kamsale cymbals", "Saffron robes", "Rudraksha mala", "Ektara"],
    startingPrice: 10000,
    rating: 4.8,
    bookings: 198,
    phone: "+919845052345",
  },
  {
    id: "6",
    groupName: "Hampi Nagari Vadya Tanda",
    leader: "Basavaraj",
    artForm: "Nagari Drums",
    district: "Hassan",
    members: 12,
    experienceYears: 20,
    image: nagari,
    gallery: [nagari, dollu, veera, kamsale],
    bio: "Wedding processions, baraat entries and grand inaugurations come alive with our colossal Nagari drums. Loud, festive and unforgettable.",
    equipment: ["8 large Nagari drums", "Colourful turbans", "LED light dhols", "Battery sound packs"],
    startingPrice: 14000,
    rating: 4.6,
    bookings: 320,
    phone: "+919845062345",
  },
  {
    id: "7",
    groupName: "Annapoorneshwari Suggi Mela",
    leader: "Geetha",
    artForm: "Suggi Kunitha",
    district: "Chitradurga",
    members: 11,
    experienceYears: 12,
    image: suggi,
    gallery: [suggi, pooja, dollu, kamsale],
    bio: "Harvest festival dance from the plains of Chitradurga. Vibrant sarees, marigold garlands and joyous folk songs welcoming Sankranti and Suggi season.",
    equipment: ["Traditional silk sarees", "Marigold malas", "Dollu & jagate", "Wireless mics"],
    startingPrice: 9000,
    rating: 4.7,
    bookings: 142,
    phone: "+919845072345",
  },
];
