import { Property, PropertySearchFilters } from "@/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "/api/";

export const propertiesApi = createApi({
    tagTypes: ["propeties-rtk"],
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (build) => ({
        getProperties: build.query<{ properties: Property[]; total: number }, PropertySearchFilters | void>({
            query: (filters) => {
                const params = new URLSearchParams();

                if (filters?.location) params.append("location", filters.location);
                if (filters?.type) params.append("type", filters.type);
                if (filters?.bedRooms) params.append("bedRooms", filters.bedRooms.toString());
                if (filters?.priceRange) {
                    params.append("minPrice", filters.priceRange.from.toString());
                    params.append("maxPrice", filters.priceRange.to.toString());
                }
                if (filters?.amenities?.length) {
                    filters.amenities.forEach((a: string) => params.append("amenities", a));
                }

                return { url: `/properties?${params.toString()}`, method: "GET" };
            },
            providesTags: ["propeties-rtk"],
        }),
        addProperty: build.mutation<Property, Property>({
            query: (body) => ({ url: `/property`, method: "POST", body }),
            invalidatesTags: ["propeties-rtk"],
        }),
        getReviews: build.query<Property[], void>({
            query: () => ({ url: `/reviews`, method: "GET" }),
        }),
        getInquiries: build.query<Property[], void>({
            query: () => ({ url: `/inquiries`, method: "GET" }),
        }),
    }),
});

export const { useAddPropertyMutation, useGetPropertiesQuery } = propertiesApi;