
export type PropertyType = "apartment" | "house" | "villa" | "studio" | "commercial"
export type PropetyStatus = "available" | "pending" | "sold" | "rented"
export type PropertyPurpose = "sale" | "rent"
export interface Property {
    id: string
    title: string
    description: string
    price: number
    priceType: PropertyPurpose
    location: string
    city: string
    bedrooms: number
    bathrooms: number
    size: number
    type: PropertyType
    images: string[]
    amenities: string[]
    agent: {
        id: string
        name: string
        phone: string
        email: string
        avatar: string
    }
    status: PropetyStatus
    views: number
    inquiries: number
    featured: boolean
    createdAt: string
    updatedAt: string
    verified: boolean
}


export interface PropertySearchFilters {
    location?: string;
    type?: PropertyType;
    bedRooms?: number;
    priceRange: { from: number; to: number };
    amenities?: string[];
}