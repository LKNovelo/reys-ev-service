import { defineField, defineType } from "sanity";

export const blogPostSchema = defineType({
  name:  "blogPost",
  title: "Blog Post",
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
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "publishedAt",
      title: "Published at",
      type:  "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name:  "excerpt",
      title: "Excerpt",
      type:  "text",
      rows:  3,
      description: "Shown on the blog index card. Max 160 chars.",
      validation: (r) => r.max(160),
    }),
    defineField({
      name:    "coverImage",
      title:   "Cover image",
      type:    "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name:  "alt",
          title: "Alt text",
          type:  "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name:  "category",
      title: "Category",
      type:  "string",
      options: {
        list: [
          { title: "Diagnostics",     value: "diagnostics"     },
          { title: "Repair Tips",     value: "repair-tips"     },
          { title: "New Owner Guide", value: "new-owner-guide" },
          { title: "Behind the Work", value: "behind-the-work" },
          { title: "Tesla News",      value: "tesla-news"      },
        ],
      },
    }),
    defineField({
      name:  "body",
      title: "Body",
      type:  "array",
      of: [
        { type: "block" },
        {
          type:    "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name:  "seoTitle",
      title: "SEO title override",
      type:  "string",
      description: "Defaults to post title if blank. Max 60 chars.",
      validation: (r) => r.max(60),
    }),
    defineField({
      name:  "seoDesc",
      title: "SEO meta description",
      type:  "text",
      rows:  2,
      description: "Max 155 chars.",
      validation: (r) => r.max(155),
    }),
  ],
  preview: {
    select: {
      title:    "title",
      subtitle: "publishedAt",
      media:    "coverImage",
    },
    prepare({ title, subtitle, media }: {
      title: string; subtitle: string; media: unknown
    }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "Draft",
        media,
      };
    },
  },
});
