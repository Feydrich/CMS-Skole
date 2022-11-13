export interface SiteInfo {
  name: string;
  description: string;
  images: string[];
  colorSchemes: {
    primaryColor: string;
    primaryColorDark: string;
    primaryColorTransparent: string;
    secondaryColor: string;
    secondaryColorDark: string;
    background: string;
    legend: string;
    fontColor:string;
  };
}
