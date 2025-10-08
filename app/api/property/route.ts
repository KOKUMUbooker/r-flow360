import { Property } from "@/types";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const propId = searchParams.get("propId") || "";

        const propertiesJsonPath = path.join(process.cwd(), "json", "properties.json");
        const data = await fs.readFile(propertiesJsonPath, "utf-8");
        const properties: Property[] = JSON.parse(data) || [];

        const targetProperty = properties.find(prop => prop.id === propId)
        if (targetProperty) {
            return NextResponse.json({ success: true, property: targetProperty }, { status: 200 });
        }
        else {
            return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Failed to read properties.json:", error);
        return NextResponse.json(
            { success: false, error: "Failed to read properties data" },
            { status: 500 }
        );
    }
}
