# Single-post reading

## Purpose

Provide the full reading view for one blog article, including its metadata, featured image, MDX body, and navigation back to the blog root.

## User

- Primary user: a reader consuming a selected article.
- Host user: a developer supplying the loaded frontmatter, content, title, and blog root URL.
- Content author: an editor responsible for the article body and frontmatter.

## Inputs

- Article frontmatter.
- MDX article content.
- Optional display title for the back-link label.
- Blog root URL.

## Outputs

- Article header with date, reading time, title, author, tags, and optional featured image.
- Rendered MDX article content.
- Interactive image and link behavior through custom renderers.
- A back link to the blog root.

## Workflow

1. The host application resolves a slug and loads its `.mdx` file.
2. The host passes frontmatter and content to `BlogPost`.
3. The component calculates reading time and formats the date.
4. The header and article body are rendered.
5. The reader reads the article, expands images, follows links, or returns to the blog root.

## Business rules

- Reading time is calculated at 240 words per minute and rounded up.
- The article body is rendered as MDX through `MDXRemote`.
- Tags are displayed through the shared tag-list component.
- The supplied blog root URL is the destination for the back link.
- An optional featured image is displayed above the article body.

## Edge cases

- A missing post file causes the upstream filesystem read to fail.
- Missing optional author, tag, or image data results in those elements being omitted.
- Missing title handling differs between normalized list metadata and raw detail frontmatter, so the detail view may render an absent title.
- Invalid dates can produce unreliable relative-date output.
- Empty content still goes through the reading-time and MDX rendering path.

## Dependencies

- [BlogPost](../../../src/components/BlogPost.tsx).
- `next-mdx-remote` for MDX rendering.
- Next.js `Link` for navigation.
- Material UI layout and typography components.
- Shared author, tag, image, link, date, and reading-time helpers.

## Current limitations

- The component does not load posts, resolve routes, or provide a not-found state.
- It does not validate frontmatter or sanitize content at this boundary.
- It does not provide table of contents, comments, reactions, or sharing controls.
- Whether the blog-root back link is required for every integration requires product confirmation.
