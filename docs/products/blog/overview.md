# Blog overview

## Purpose

Provide a reusable, file-based blog experience for Next.js applications. The package loads Markdown or MDX posts, normalizes their metadata, and supplies components for listing, reading, and filtering posts.

## User

- Primary user: a developer integrating the package into a Next.js application.
- End user: a reader browsing and reading the published blog content.
- Content author: an editor or developer who creates local Markdown or MDX files.

## Inputs

- A directory containing Markdown or MDX files.
- Frontmatter fields such as title, date, summary, tags, featured image, and author data.
- A blog root URL supplied by the host application.
- Post slugs and tag slugs supplied by the host application's routes.

## Outputs

- Date-sorted post metadata from `getAllPosts`.
- Tag-filtered post metadata from `getPostsByTag`.
- Frontmatter and article content from `getPostBySlug`.
- Reusable landing, detail, and tag-view UI components.

## Workflow

1. The host application points the library at a content directory.
2. The library reads each file and parses its frontmatter with `gray-matter`.
3. Post metadata is normalized and posts are sorted by date descending.
4. The host application passes the resulting data into the appropriate blog component.
5. Readers browse the list, open a post, or filter posts by tag.

## Business rules

- A post slug is derived from its filename.
- Posts are ordered newest first based on their parsed date.
- Missing title, date, and summary metadata receive the implementation defaults: `Untitled`, `1970-01-01`, and an empty string.
- Tags are normalized to lowercase, hyphen-separated slugs.
- The README presents `/public/blog` as the example content location; the library itself accepts a directory argument.

## Edge cases

- Empty content directories produce an empty post collection.
- Missing metadata is tolerated through parser defaults or optional fields.
- Invalid dates may lead to unreliable sort order because sorting relies on JavaScript date parsing.
- A missing slug file causes `getPostBySlug` to throw a filesystem read error.
- The parser attempts to read every directory entry as a post file; unsupported entries are not explicitly filtered.

## Dependencies

- Node.js filesystem and path APIs.
- `gray-matter` for frontmatter parsing.
- React, Next.js, Material UI, and `next-mdx-remote` for the rendering layer.
- A host application that owns routes and supplies the content directory.

## Current limitations

- The package does not provide a CMS, authoring interface, database, publishing workflow, or authentication.
- It does not define a built-in error or empty-state experience for the host application.
- It does not validate frontmatter schemas before rendering.
- Whether missing or malformed metadata should be a hard publishing error requires product confirmation.
