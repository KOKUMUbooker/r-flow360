export enum Role {
    buyer = "buyer",
    seller = "seller",
    renter = "renter",
    admin = "admin",
    agent = "agent"
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    phone: string;
    avatar: string;
    isActive: boolean;

    // Agent specific fields
    properties: string[];
    totalListings?: number;
    activeListings?: number;
    soldListings?: number;
    totalViews?: number;
    totalInquiries?: number;
}
