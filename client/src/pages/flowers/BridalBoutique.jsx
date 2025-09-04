import React from "react";
import CategoryGridPage from "../../components/common/CategoryGridPage";

export default function BridalBoutique() {
  return (
    <CategoryGridPage
      title="Bridal Boutique"
      description="Bridal bouquets, boutonnières, and luxe arrangements for your big day."
      heroImg="/assets/BridalBoutique/hero.jpg"
      category="Bridal Boutique"
      altFilters={[
        { key: "category", value: "Bridal" },
        { key: "occasion", value: "Bridal Boutique" },
      ]}
    />
  );
}
