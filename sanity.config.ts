import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool }    from "@sanity/vision";
import { schemaTypes }   from "./src/sanity/schema";

export default defineConfig({
  name:      "rays-ev-service",
  title:     "Ray's EV Service",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath:  "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Services & Pricing").child(
              S.documentTypeList("service").title("Services")
            ),
            S.listItem().title("Blog Posts").child(
              S.documentTypeList("blogPost").title("Blog Posts")
            ),
            S.listItem().title("Ray's Gear").child(
              S.documentTypeList("gear").title("Gear & Recommendations")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
