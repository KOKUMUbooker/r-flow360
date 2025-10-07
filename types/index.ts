export interface Inquiry {
    id: string,
    propertyId: string,
    userId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    message: string,
    status: string,
    createdAt: string,
}

export interface ListingReport {
    reason: string;
    description: string;
    reporterName: string;
    reporterEmail: string;
    user_id: string;
}

export interface Reviews {
    id: string;
    propertyId: string;
    rating: number;
    comment: string;
    date: number;
    user_id: string;
}

export * from "./property"
export * from "./auth"
export * from "./error"