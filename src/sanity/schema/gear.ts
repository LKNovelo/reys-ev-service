import { defineField, defineType } from "sanity";

export const gearSchema = defineType({
  name:  "gear",
  title: "Ray's Gear",
  type:  "document",
  fields: [
    defineField({
      name:  "name",
      title: "Product name",
      type:  "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "brand",
      title: "Brand",
      type:  "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "category",
      title: "Category",
      type:  "string",
      options: {
        list: [
          { title: "Phone & mounting",     value: "phone-mounting"     },
          { title: "Interior protection",  value: "interior-protection"},
          { title: "Frunk & trunk",        value: "frunk-trunk"        },
          { title: "Charging",             value: "charging"           },
          { title: "Cleaning",             value: "cleaning"           },
          { title: "Roadside & safety",    value: "roadside-safety"    },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name:    "featured",
      title:   "Featured / Top pick",
      type:    "boolean",
      initialValue: false,
      description: "Featured products appear as wide cards at the top of the page",
    }),
    defineField({
      name:  "price",
      title: "Price display",
      type:  "string",
      description: 'e.g. "~$60–80" or "~$120 full set"',
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "shortDesc",
      title: "Short description",
      type:  "text",
      rows:  3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name:  "raysTake",
      title: "Ray's take",
      type:  "text",
      rows:  3,
      description: "Ray's first-person opinion — this is the key differentiator on the page",
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "amazonUrl",
      title: "Amazon affiliate URL",
      type:  "url",
    }),
    defineField({
      name:  "relatedPost",
      title: "Related blog post",
      type:  "reference",
      to:    [{ type: "blogPost" }],
      description: "If Ray wrote a post about this product, link it here",
    }),
    defineField({
      name:    "productImage",
      title:   "Product image",
      type:    "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name:  "order",
      title: "Display order",
      type:  "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Featured first, then order", name: "featuredOrder", by: [{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "brand", media: "productImage" },
    prepare(selection: Record<string, unknown>) {
      return {
        title: selection.title as string | undefined,
        subtitle: selection.subtitle as string | undefined,
        media: selection.media,
      };
    },
  },
});
