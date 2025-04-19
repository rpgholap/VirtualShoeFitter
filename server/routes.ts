import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertShoeSchema, insertUserSchema, insertTestimonialSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/shoes", async (req: Request, res: Response) => {
    try {
      // Parse filter parameters
      const category = req.query.category as string | undefined;
      const brand = req.query.brand as string | undefined;
      const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
      const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
      const isArReady = req.query.isArReady === "true" ? true : req.query.isArReady === "false" ? false : undefined;

      const filter = {
        category,
        brand,
        priceRange: { min: minPrice, max: maxPrice },
        isArReady
      };

      const shoes = await storage.getShoes(filter);
      res.json(shoes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shoes" });
    }
  });

  app.get("/api/shoes/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const shoe = await storage.getShoeById(id);
      
      if (!shoe) {
        return res.status(404).json({ message: "Shoe not found" });
      }
      
      res.json(shoe);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shoe" });
    }
  });

  app.post("/api/shoes", async (req: Request, res: Response) => {
    try {
      const shoeData = insertShoeSchema.parse(req.body);
      const shoe = await storage.createShoe(shoeData);
      res.status(201).json(shoe);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid shoe data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create shoe" });
      }
    }
  });

  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create testimonial" });
      }
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.patch("/api/users/:id/foot-data", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const footData = req.body;
      
      const updatedUser = await storage.updateUserFootData(userId, footData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update foot data" });
    }
  });

  app.patch("/api/users/:id/preferences", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const preferences = req.body;
      
      const updatedUser = await storage.updateUserPreferences(userId, preferences);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
