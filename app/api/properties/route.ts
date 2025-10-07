import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const location = searchParams.get("location");
        const type = searchParams.get("type");
        const bedRooms = Number(searchParams.get("bedRooms"));
        const minPrice = Number(searchParams.get("minPrice")) || 0;
        const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
        const amenities = searchParams.getAll("amenities"); // array-friendly

        const propertiesJsonPath = path.join(process.cwd(), "json", "properties.json");
        const data = await fs.readFile(propertiesJsonPath, "utf-8");
        let properties = JSON.parse(data) || [];

        // Apply filters
        properties = properties.filter((p: any) => {
            const matchesLocation = location ? p.location.toLowerCase().includes(location.toLowerCase()) : true;
            const matchesType = type ? p.type === type : true;
            const matchesBedrooms = bedRooms ? p.bedrooms === bedRooms : true;
            const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
            const matchesAmenities =
                amenities.length > 0 ? amenities.every((a) => p.amenities.includes(a)) : true;

            return matchesLocation && matchesType && matchesBedrooms && matchesPrice && matchesAmenities;
        });

        return NextResponse.json(
            { success: true, total: properties.length, properties },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to read properties.json:", error);
        return NextResponse.json(
            { success: false, error: "Failed to read properties data" },
            { status: 500 }
        );
    }
}
