export interface SiteInfo {
  name: string;
  images: string[];
  colorSchemes: {
    primaryColor: string;
    primaryColorDark: string;
    primaryColorTransparent: string;
    secondaryColor: string;
    secondaryColorDark: string;
  };
}
