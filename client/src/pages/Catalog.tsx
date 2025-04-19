import { useEffect } from "react";
import ShoeCatalog from "@/components/shoes/ShoeCatalog";

const Catalog = () => {
  useEffect(() => {
    // Scroll to top when this page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ShoeCatalog />
    </>
  );
};

export default Catalog;
