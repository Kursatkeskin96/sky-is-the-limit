export interface CameraInfo {
    abbreviation: string;
    name: string;
    curiosity: boolean;
    opportunity: boolean;
    spirit: boolean;
  }
  
  export const cameraData: CameraInfo[] = [
    {
      abbreviation: "FHAZ",
      name: "Front Hazard Avoidance Camera",
      curiosity: true,
      opportunity: true,
      spirit: true,
    },
    {
      abbreviation: "RHAZ",
      name: "Rear Hazard Avoidance Camera",
      curiosity: true,
      opportunity: true,
      spirit: true,
    },
    {
      abbreviation: "MAST",
      name: "Mast Camera",
      curiosity: true,
      opportunity: false,
      spirit: false,
    },
    {
      abbreviation: "CHEMCAM",
      name: "Chemistry and Camera Complex",
      curiosity: true,
      opportunity: false,
      spirit: false,
    },
    {
      abbreviation: "MAHLI",
      name: "Mars Hand Lens Imager",
      curiosity: true,
      opportunity: false,
      spirit: false,
    },
    {
      abbreviation: "MARDI",
      name: "Mars Descent Imager",
      curiosity: true,
      opportunity: false,
      spirit: false,
    },
    {
      abbreviation: "NAVCAM",
      name: "Navigation Camera",
      curiosity: true,
      opportunity: true,
      spirit: true,
    },
    {
      abbreviation: "PANCAM",
      name: "Panoramic Camera",
      curiosity: false,
      opportunity: true,
      spirit: true,
    },
    {
      abbreviation: "MINITES",
      name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      curiosity: false,
      opportunity: true,
      spirit: true,
    },
  ];
  