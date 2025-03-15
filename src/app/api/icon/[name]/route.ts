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
    const { searchParams } = new URL(request.url);
    const colorType = searchParams.get("color") || "primary";
    const fullConfig = resolveConfig(config);
    let colorValue;

    switch (colorType) {
      case "ink":
        const ink = fullConfig.theme?.colors?.ink;
        colorValue =
          typeof ink === "object" && ink !== null
            ? ink.DEFAULT
            : typeof ink === "string"
            ? ink
            : "#000000";
        break;

      case "base":
        const base = fullConfig.theme?.colors?.base;
        colorValue =
          typeof base === "object" && base !== null
            ? base.DEFAULT
            : typeof base === "string"
            ? base
            : "#FFFFFF";
        break;

      case "primary":
      default:
        const primary = fullConfig.theme?.colors?.primary;
        colorValue =
          typeof primary === "object" && primary !== null
            ? primary.DEFAULT
            : typeof primary === "string"
            ? primary
            : "#000000";
        break;
    }

    const svgPath = path.join(process.cwd(), `src/media/${name}.svg`);
    let svgContent = fs.readFileSync(svgPath, "utf8");

    if (svgContent.includes("fill=")) {
      svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${colorValue}"`);
    } else {
      svgContent = svgContent.replace("<svg", `<svg fill="${colorValue}"`);
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
