export interface SnapLensOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  lensUrl: string;
}

export const snapLenses: SnapLensOption[] = [
  {
    id: "lens1",
    name: "Athletic Shoes",
    description: "Try on athletic performance shoes with responsive cushioning",
    imageUrl: "https://lens.snap.com/assets/dark_bg-40484b7d.svg",
    lensUrl: "https://lens.snap.com/experience/4b051c77-d22d-4795-96ef-7660e6451687"
  },
  {
    id: "lens2", 
    name: "Casual Sneakers",
    description: "Experience our everyday casual sneakers collection",
    imageUrl: "https://lens.snap.com/assets/dark_bg-40484b7d.svg",
    lensUrl: "https://lens.snap.com/experience/408cdcf1-fec6-461b-b845-f13b668d0ab5"
  },
  {
    id: "lens3",
    name: "Fashion Footwear",
    description: "Try our latest designer fashion footwear",
    imageUrl: "https://lens.snap.com/assets/dark_bg-40484b7d.svg",
    lensUrl: "https://lens.snap.com/experience/cc1f666c-1a88-4f04-a525-2ec1874a5568"
  }
];