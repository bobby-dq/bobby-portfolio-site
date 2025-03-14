export async function extractSvgContent(logoName: string) {
  try {
    // const response = await fetch(`/api/svg-content/${logoName}`);
    // if (!response.ok) throw new Error("Failed to fetch SVG");
    // const data = await response.json();
    // return data.content;
    return null;
  } catch (error) {
    console.error(`Error loading SVG ${logoName}:`, error);
    return null;
  }
}
