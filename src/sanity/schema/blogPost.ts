import { defineField, defineType, defineArrayMember } from "sanity";

export const blogPostSchema = defineType({
  name:  "blogPost",
  title: "Blog Post",
  type:  "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "featured", title: "Featured post", type: "boolean", initialValue: false, description: "Only one post should be featured at a time" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.max(200) }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required() }),
      defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
    ]}),
    defineField({ name: "category", title: "Category", type: "string", options: { list: [
      { title: "Battery", value: "Battery" },
      { title: "Software", value: "Software" },
      { title: "Charging", value: "Charging" },
      { title: "Tires", value: "Tires" },
      { title: "Service finding", value: "Service finding" },
      { title: "EV 101", value: "EV 101" },
      { title: "Supercharger", value: "Supercharger" },
    ]}}),
    defineField({ name: "body", title: "Body", type: "array", of: [
      defineArrayMember({ type: "block" }),
      defineArrayMember({ type: "image", name: "inlineImage", options: { hotspot: true }, fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ]}),
      defineArrayMember({ type: "object", name: "fieldNote", title: "Field note (Ray's voice — green)", fields: [
        defineField({ name: "body", title: "Note text", type: "text", rows: 4, validation: (r) => r.required() }),
      ]}),
      defineArrayMember({ type: "object", name: "warningNote", title: "Warning callout (amber)", fields: [
        defineField({ name: "heading", title: "Warning heading", type: "string" }),
        defineField({ name: "body", title: "Warning text", type: "text", rows: 3, validation: (r) => r.required() }),
      ]}),
      defineArrayMember({ type: "object", name: "faultCodeBlock", title: "Fault code block", fields: [
        defineField({ name: "codes", title: "Fault codes", type: "array", of: [defineArrayMember({ type: "object", fields: [
          defineField({ name: "code", title: "Fault code", type: "string" }),
          defineField({ name: "desc", title: "Description", type: "string" }),
        ]})] }),
      ]}),
      defineArrayMember({ type: "object", name: "inlineProduct", title: "Inline product recommendation", fields: [
        defineField({ name: "product", title: "Product", type: "reference", to: [{ type: "gear" }], validation: (r) => r.required() }),
      ]}),
    ]}),
    defineField({ name: "references", title: "References & further reading", type: "array", of: [
      defineArrayMember({ type: "object", name: "reference", fields: [
        defineField({ name: "group", title: "Group", type: "string", options: { list: [
          { title: "Tesla official", value: "Tesla official" },
          { title: "Parts & ordering", value: "Parts & ordering" },
          { title: "Further reading", value: "Further reading" },
        ]}, validation: (r) => r.required() }),
        defineField({ name: "title", title: "Link title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
        defineField({ name: "source", title: "Source domain", type: "string" }),
        defineField({ name: "desc", title: "Description (optional)", type: "string" }),
      ], preview: { select: { title: "title", subtitle: "source" } }}),
    ]}),
    defineField({ name: "relatedPosts", title: "Related posts (max 3)", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "blogPost" }] })], validation: (r) => r.max(3) }),
    defineField({ name: "seoTitle", title: "SEO title override", type: "string", validation: (r) => r.max(60) }),
    defineField({ name: "seoDesc", title: "SEO meta description", type: "text", rows: 2, validation: (r) => r.max(155) }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    prepare(selection: Record<string, unknown>) {
      const sub = selection.subtitle as string | undefined;
      return { title: selection.title, subtitle: sub ? new Date(sub).toLocaleDateString() : "Draft", media: selection.media };
    },
  },
});
