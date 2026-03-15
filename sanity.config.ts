import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool }    from "@sanity/vision";
import { schemaTypes }   from "./src/sanity/schema";

export default defineConfig({
  name:      "reys-ev-service",
  title:     "Rey's EV Service",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Services & Pricing")
              .child(S.documentTypeList("service").title("Services")),
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
