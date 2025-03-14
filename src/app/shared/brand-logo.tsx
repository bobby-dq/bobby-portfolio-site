import { extractSvgContent } from "@/services/utils/extractSvgContent";

interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  colorClass?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = async ({
  name,
  colorClass = "text-primary fill-current",
  ...props
}) => {
  const svgContent = await extractSvgContent(name) as unknown as string;

  if (!svgContent) {
    return null;
  }

  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  const innerContentMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const innerContent = innerContentMatch ? innerContentMatch[1] : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={colorClass}
      {...props}
      dangerouslySetInnerHTML={{ __html: innerContent }}
    />
  );
};
