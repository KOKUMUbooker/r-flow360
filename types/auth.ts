export enum Role {
    /** Buyer or renter */
    Reg_User = "Buyer_or_renter",
    Agent_Seller = "Agent_or_seller",
    Admin = "Admin"
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
