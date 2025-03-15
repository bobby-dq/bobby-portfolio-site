/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import resolveConfig from "tailwindcss/resolveConfig";
import config from "../../../../../tailwind.config";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = await params;

    const fullConfig = resolveConfig(config);
    const primary = fullConfig.theme?.colors?.primary;
    const primaryColor =
      typeof primary === "object" && primary !== null
        ? primary.DEFAULT
        : typeof primary === "string"
        ? primary
        : "#000000";

    const svgPath = path.join(process.cwd(), `src/media/${name}.svg`);
    let svgContent = fs.readFileSync(svgPath, "utf8");

    if (svgContent.includes("fill=")) {
      svgContent = svgContent.replace(
        /fill="[^"]*"/g,
        `fill="${primaryColor}"`
      );
    } else {
      svgContent = svgContent.replace("<svg", `<svg fill="${primaryColor}"`);
    }

    return new NextResponse(svgContent, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400", // Cache for a day
      },
    });
  } catch (error) {
    console.error("Error generating SVG icon:", error);
    return new NextResponse("Error generating icon", { status: 500 });
  }
}
