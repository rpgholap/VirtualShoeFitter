import { shoes, testimonials, users, type User, type InsertUser, type Shoe, type InsertShoe, type Testimonial, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserFootData(userId: number, footData: any): Promise<User | undefined>;
  updateUserPreferences(userId: number, preferences: any): Promise<User | undefined>;
  
  // Shoe operations
  getShoes(filter?: {
    category?: string;
    brand?: string;
    priceRange?: { min?: number; max?: number };
    isArReady?: boolean;
  }): Promise<Shoe[]>;
  getShoeById(id: number): Promise<Shoe | undefined>;
  createShoe(shoe: InsertShoe): Promise<Shoe>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private shoes: Map<number, Shoe>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentShoeId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.shoes = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentShoeId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with sample shoes
    this.initializeShoes();
    this.initializeTestimonials();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, footData: null, preferences: null };
    this.users.set(id, user);
    return user;
  }

  async updateUserFootData(userId: number, footData: any): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    user.footData = footData;
    this.users.set(userId, user);
    return user;
  }

  async updateUserPreferences(userId: number, preferences: any): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    user.preferences = preferences;
    this.users.set(userId, user);
    return user;
  }

  // Shoe methods
  async getShoes(filter?: {
    category?: string;
    brand?: string;
    priceRange?: { min?: number; max?: number };
    isArReady?: boolean;
  }): Promise<Shoe[]> {
    let filteredShoes = Array.from(this.shoes.values());

    if (filter) {
      if (filter.category) {
        filteredShoes = filteredShoes.filter(shoe => shoe.category === filter.category);
      }
      if (filter.brand) {
        filteredShoes = filteredShoes.filter(shoe => shoe.brand === filter.brand);
      }
      if (filter.priceRange) {
        if (filter.priceRange.min !== undefined) {
          filteredShoes = filteredShoes.filter(shoe => shoe.price >= filter.priceRange.min!);
        }
        if (filter.priceRange.max !== undefined) {
          filteredShoes = filteredShoes.filter(shoe => shoe.price <= filter.priceRange.max!);
        }
      }
      if (filter.isArReady !== undefined) {
        filteredShoes = filteredShoes.filter(shoe => shoe.isArReady === filter.isArReady);
      }
    }

    return filteredShoes;
  }

  async getShoeById(id: number): Promise<Shoe | undefined> {
    return this.shoes.get(id);
  }

  async createShoe(insertShoe: InsertShoe): Promise<Shoe> {
    const id = this.currentShoeId++;
    const shoe: Shoe = { ...insertShoe, id };
    this.shoes.set(id, shoe);
    return shoe;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Initialize with sample data
  private initializeShoes() {
    const sampleShoes: InsertShoe[] = [
      {
        name: "Nike Air Max 97",
        brand: "Nike",
        price: 175,
        description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        modelUrl: "/models/nike-air-max-97.glb",
        category: "Running",
        rating: 4.5,
        reviewCount: 127,
        isArReady: true,
        sizes: [7, 8, 9, 10, 11, 12],
      },
      {
        name: "Adidas Ultraboost 22",
        brand: "Adidas",
        price: 189,
        description: "Enjoy incredible energy return with every step in these responsive running shoes.",
        imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
        modelUrl: "/models/adidas-ultraboost-22.glb",
        category: "Running",
        rating: 5,
        reviewCount: 89,
        isArReady: true,
        sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
      },
      {
        name: "Puma RS-X Toys",
        brand: "Puma",
        price: 120,
        description: "The RS-X Toys sneaker boasts a fresh, bulky design with eye-catching color combinations.",
        imageUrl: "https://images.unsplash.com/photo-1600181516264-3ea807ff44b9",
        modelUrl: "/models/puma-rs-x-toys.glb",
        category: "Lifestyle",
        rating: 4.0,
        reviewCount: 56,
        isArReady: true,
        sizes: [7, 8, 9, 10, 11],
      },
      {
        name: "Nike Dunk Low",
        brand: "Nike",
        price: 110,
        description: "Created for the hardwood but taken to the streets, this 80s icon returns with perfectly shined overlays and classic team colors.",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
        modelUrl: "/models/nike-dunk-low.glb",
        category: "Lifestyle",
        rating: 4.5,
        reviewCount: 112,
        isArReady: true,
        sizes: [4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      {
        name: "New Balance 574",
        brand: "New Balance",
        price: 90,
        description: "The 574 features clean lines and a simple, durable design that pairs easily with any look.",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        modelUrl: "/models/new-balance-574.glb",
        category: "Lifestyle",
        rating: 4.0,
        reviewCount: 78,
        isArReady: true,
        sizes: [7, 8, 9, 10, 11, 12, 13],
      },
      {
        name: "Converse Chuck Taylor",
        brand: "Converse",
        price: 65,
        description: "The Chuck Taylor All Star high top is the iconic sneaker that started it all.",
        imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
        modelUrl: "/models/converse-chuck-taylor.glb",
        category: "Lifestyle",
        rating: 4.0,
        reviewCount: 145,
        isArReady: true,
        sizes: [5, 6, 7, 8, 9, 10, 11, 12],
      },
      {
        name: "Vans Old Skool",
        brand: "Vans",
        price: 70,
        description: "The Old Skool, Vans classic skate shoe and first to bear the iconic side stripe.",
        imageUrl: "https://images.unsplash.com/photo-1608379743498-91dbfdb24a5c",
        modelUrl: "/models/vans-old-skool.glb",
        category: "Skateboarding",
        rating: 4.5,
        reviewCount: 92,
        isArReady: true,
        sizes: [6, 7, 8, 9, 10, 11, 12],
      },
      {
        name: "Asics Gel-Kayano 28",
        brand: "Asics",
        price: 160,
        description: "The GEL-KAYANO 28 shoe is stability running shoe dedicated for the long run.",
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
        modelUrl: "/models/asics-gel-kayano-28.glb",
        category: "Running",
        rating: 5.0,
        reviewCount: 63,
        isArReady: true,
        sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      }
    ];

    sampleShoes.forEach(shoe => {
      this.createShoe(shoe);
    });
  }

  private initializeTestimonials() {
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        rating: 5.0,
        review: "The virtual try-on was incredible! I could see exactly how the shoes would look on my feet before ordering. The size recommendation was spot on, and I didn't have to return anything.",
        productName: "Nike Air Max 97",
        avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      {
        name: "Michael Thompson",
        rating: 4.5,
        review: "I was skeptical at first, but the AR technology is amazing. It saved me from buying shoes that wouldn't have matched my style. The app is super easy to use too!",
        productName: "Adidas Ultraboost",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Emily Rodriguez",
        rating: 5.0,
        review: "As someone with wide feet, finding the right fit has always been challenging. This app nailed it! I tried on dozens of shoes virtually and found the perfect pair without leaving home.",
        productName: "New Balance 574",
        avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg"
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
