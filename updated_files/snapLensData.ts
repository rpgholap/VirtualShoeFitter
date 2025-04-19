export interface SnapLensOption {
  id: string;
  name: string;
  description: string;
  shoeImageUrl: string;
  snapBgUrl: string;
  lensUrl: string;
}

export const snapLenses: SnapLensOption[] = [
  {
    id: "lens1",
    name: "Athletic Running Shoes",
    description: "Try on high-performance running shoes with responsive cushioning and breathable design",
    shoeImageUrl: "/shoe-athletic.jpg",
    snapBgUrl: "/snap-lens-bg.svg",
    lensUrl: "https://lens.snap.com/experience/4b051c77-d22d-4795-96ef-7660e6451687"
  },
  {
    id: "lens2", 
    name: "Casual Everyday Sneakers",
    description: "Experience our comfortable everyday casual sneakers collection with modern styling",
    shoeImageUrl: "/shoe-casual.jpg",
    snapBgUrl: "/snap-lens-bg.svg",
    lensUrl: "https://lens.snap.com/experience/408cdcf1-fec6-461b-b845-f13b668d0ab5"
  },
  {
    id: "lens3",
    name: "Designer Fashion Footwear",
    description: "Try our latest designer fashion footwear with premium materials and trendy designs",
    shoeImageUrl: "/shoe-fashion.jpg",
    snapBgUrl: "/snap-lens-bg.svg",
    lensUrl: "https://lens.snap.com/experience/cc1f666c-1a88-4f04-a525-2ec1874a5568"
  }
];