import { Role, User } from "@/types"

export const activeAgent: User = {
    "id": "agent1",
    "name": "Jane Wanjiru",
    "email": "jane@rentflow360.com",
    "role": Role.Agent_Seller,
    "phone": "+254 712 345 678",
    "avatar": "https://images.unsplash.com/photo-1699220274995-a37956b7e43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "isActive": true,
    "properties": ["1", "4"],
    "totalListings": 12,
    "activeListings": 8,
    "soldListings": 4,
    "totalViews": 5432,
    "totalInquiries": 234
}

export const activeAdminAccount: User = {
    "id": "admin1",
    "name": "Cynthia Mwende",
    "email": "cyM@gm.com",
    "role": Role.Admin,
    "phone": "+254 700 000 999",
    "avatar": "https://images.unsplash.com/photo-1699220274995-a37956b7e43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "isActive": true,
    "properties": []
}

export const activeRegUserAccount: User = {
    "id": "user5",
    "name": "Kevin Kiptoo",
    "email": "kevin.kiptoo@example.com",
    "role": Role.Reg_User,
    "phone": "+254 711 222 333",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg",
    "isActive": true,
    "properties": []
}