# Post listing

## Purpose

Present a browsable collection of posts with one featured item and a set of secondary items. The list supports either summary cards or full article content.

## User

- Primary user: a reader scanning recent blog content.
- Host user: a developer configuring the blog root URL and list display mode.
- Content author: an editor whose post dates determine ordering.

## Inputs

- A date-sorted `PostMeta[]` collection.
- The blog root URL used to construct post and tag links.
- The optional `showFullContent` flag.
- Post metadata including title, date, reading-content source, author, tags, image, and summary.

## Outputs

- The first supplied post rendered as a featured card.
- Remaining posts rendered in a responsive grid or vertical stack.
- Post metadata, summaries or full MDX content, tag links, and `Read more` links.
- No rendered output when the collection is empty.

## Workflow

1. The host application loads and sorts posts.
2. `BlogList` selects the first post as featured.
3. The remaining posts are rendered with `PostCard`.
4. Summary mode uses a responsive grid; full-content mode uses a vertical stack.
5. A reader opens a post, follows a tag, or continues scanning the list.

## Business rules

- The first item in the supplied collection is always featured.
- The default display mode is summary mode because `showFullContent` defaults to false.
- Summary cards show estimated reading time, title, tags, optional image, summary, and a detail link.
- Featured-style cards also show optional author information.
- Reading time uses the article source and the default 240 words-per-minute estimate.

## Edge cases

- An empty collection renders nothing rather than an empty-state message.
- A post without a summary omits the summary element.
- A post without a featured image omits the image area.
- A post without author data omits the author row.
- Full-content mode requires `mdxSource`; missing content can cause the MDX renderer to receive an invalid value.

## Dependencies

- [BlogList](../../../src/components/BlogList.tsx) and [PostCard](../../../src/components/PostCard.tsx).
- Material UI layout and typography components.
- Next.js links and the tag, image, and link renderers.
- Post metadata supplied by the host application's content-loading workflow.

## Current limitations

- There is no explicit editorial flag for choosing a featured post.
- The component does not paginate, search, or provide an empty-state UI.
- The list does not independently load or validate posts; the host application supplies them.
- Whether grid mode should be the default for all integrations requires product confirmation.
