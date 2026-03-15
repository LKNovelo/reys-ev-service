import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name:  "service",
  title: "Service",
  type:  "document",
  fields: [
    defineField({
      name:  "title",
      title: "Title",
      type:  "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name:    "slug",
      title:   "Slug",
      type:    "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "price",
      title: "Price (USD, no $)",
      type:  "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name:  "priceSuffix",
      title: "Price suffix",
      type:  "string",
      description: 'e.g. "flat" or "credited to repair"',
    }),
    defineField({
      name:  "featured",
      title: "Featured / Most Popular",
      type:  "boolean",
      initialValue: false,
    }),
    defineField({
      name:  "tag",
      title: "Badge label",
      type:  "string",
      description: 'e.g. "Most Popular" — leave blank for none',
    }),
    defineField({
      name:  "shortDesc",
      title: "Short description (card)",
      type:  "text",
      rows:  3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name:  "footerNote",
      title: "Footer note (coverage / hours)",
      type:  "string",
    }),
    defineField({
      name:  "order",
      title: "Display order",
      type:  "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name:  "order",
      by:    [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "price" },
    prepare(selection: Record<string, string>) {
      return { title: selection.title, subtitle: `$${selection.subtitle}` };
    },
  },
});
