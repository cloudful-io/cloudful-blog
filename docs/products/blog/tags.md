# Tag browsing

## Purpose

Let readers browse posts by topic through clickable tag chips and a filtered tag page.

## User

- Primary user: a reader exploring related content by topic.
- Host user: a developer wiring tag routes and supplying matching posts.
- Content author: an editor assigning tags in post frontmatter.

## Inputs

- A content directory.
- A requested tag slug.
- Tag values in post frontmatter.
- The blog root URL and selected tag passed to the UI components.

## Outputs

- A date-sorted collection of posts matching the requested tag slug.
- Clickable tag chips with URL-encoded routes.
- A tag heading, matching post cards, and a link back to the blog root.
- No rendered tag view when there are no matching posts.

## Workflow

1. A reader selects a tag chip on a post or card.
2. The host application receives the encoded tag route.
3. `getPostsByTag` parses posts and normalizes their tag values.
4. Matching posts are sorted newest first.
5. `BlogTagList` renders the selected tag and matching posts.

## Business rules

- Tag slugs are lowercase versions of tag values with whitespace replaced by hyphens.
- Matching is performed against the normalized slug, not the display name.
- Tag results are sorted by date descending.
- Tag links are generated relative to the supplied blog root URL.
- The displayed tag name comes from the first matching post when available, otherwise the requested tag value.

## Edge cases

- An unknown tag produces no matching posts and no rendered tag view.
- Empty tag values are not rendered as chips by `TagList` when the tag array itself is empty, but individual empty values are not explicitly filtered.
- Punctuation and repeated whitespace are not specially normalized beyond the lowercase and whitespace replacement rules.
- Unsupported directory entries can fail parsing before tag filtering occurs.

## Dependencies

- [getPostsByTag](../../../src/lib/mdx.ts).
- [TagList](../../../src/components/TagList.tsx).
- [BlogTagList](../../../src/components/BlogTagList.tsx).
- Next.js `Link` and Material UI `Chip` components.
- A host application route for `/tag/[tag]` or an equivalent path.

## Current limitations

- There is no tag index, tag count, autocomplete, search, or pagination.
- Tags are authored as simple values; structured label/slug metadata is not supported by normalization.
- The component does not provide an empty or not-found state for unknown tags.
- Whether tag labels should preserve punctuation and capitalization requires product confirmation.
