import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronLeft, 
  ChevronRight,
  Sliders,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ShoeCard from "./ShoeCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Shoe } from "@shared/schema";

interface FilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: string;
}

const ShoeCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "latest",
  });

  const { data: shoes, isLoading, error } = useQuery<Shoe[]>({
    queryKey: [
      '/api/shoes',
      filters.category,
      filters.brand,
      filters.minPrice,
      filters.maxPrice
    ],
  });

  const itemsPerPage = 8;
  const totalPages = shoes ? Math.ceil(shoes.length / itemsPerPage) : 0;

  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value }));
  };

  // Filter button click handler
  const handleFilterClick = () => {
    // In a real implementation, this would open a filter modal or drawer
    console.log("Open filter options");
  };

  // Get current shoes to display
  const getCurrentShoes = () => {
    if (!shoes) return [];
    
    // Sort shoes based on filter
    let sortedShoes = [...shoes];
    switch (filters.sortBy) {
      case "priceLowToHigh":
        sortedShoes.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedShoes.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        sortedShoes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      // latest is default
      default:
        // Assume shoes are already sorted by latest
        break;
    }
    
    // Paginate
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedShoes.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentShoes = getCurrentShoes();

  // Generate pagination items
  const paginationItems = [];
  if (totalPages <= 8) {
    // If total pages is small, show all pages
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(i);
    }
  } else {
    // Show first, last, and around current page
    paginationItems.push(1);
    if (currentPage > 3) paginationItems.push("...");
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      paginationItems.push(i);
    }
    
    if (currentPage < totalPages - 2) paginationItems.push("...");
    paginationItems.push(totalPages);
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shoe Catalog</h2>
            <p className="text-red-500">Failed to load shoes. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50" id="catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shoe Catalog</h2>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleFilterClick}>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton loading state
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="pb-2/3 w-full h-60" />
                <div className="p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-1/2 mt-1 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            currentShoes.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Button
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {paginationItems.map((item, index) => (
                typeof item === 'number' ? (
                  <Button
                    key={index}
                    variant={currentPage === item ? "default" : "outline"}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === item 
                        ? "bg-primary border-primary text-white" 
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </Button>
                ) : (
                  <span 
                    key={index} 
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                )
              ))}
              
              <Button
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoeCatalog;
