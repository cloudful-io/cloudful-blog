# Media and links

## Purpose

Make article media readable and interactive while providing consistent navigation behavior for internal and external links.

## User

- Primary user: a reader viewing article images or following article links.
- Host user: a developer supplying image URLs and integrating the renderers with MDX.
- Content author: an editor embedding images and links in Markdown or MDX.

## Inputs

- Image source and alt text from Markdown or MDX.
- Featured image URLs from post metadata.
- Link href and child content from Markdown or MDX.
- The active Material UI theme and responsive breakpoint.

## Outputs

- Responsive article and featured images.
- A clickable image that opens a larger version in a dialog.
- A full-screen image dialog on small screens with close controls.
- Theme-aware links that open external HTTP links in a new tab.

## Workflow

1. MDX content is rendered using the custom image and link components.
2. A reader clicks an article image to open the lightbox dialog.
3. The reader closes the dialog using the close control or dialog dismissal.
4. A reader follows a link; HTTP links open in a new tab, while other links use the current tab.

## Business rules

- Article images are rendered through `ImageRenderer`.
- Images are expandable by default and use the source image again in the dialog.
- The dialog is full-screen on small screens.
- URLs beginning with `http` receive a new-tab target and `noopener noreferrer`.
- Other URLs do not receive the external-link target behavior.

## Edge cases

- Missing image sources can result in a broken image because the renderer does not validate URLs.
- Missing alt text is passed through without a fallback.
- Protocol-relative, mail, and other non-`http` external URLs are treated as non-external by the current link check.
- Very large images are constrained by viewport dimensions in the dialog but are not otherwise optimized by the renderer.

## Dependencies

- [ImageRenderer](../../../src/components/ImageRenderer.tsx).
- [LinkRenderer](../../../src/components/LinkRenderer.tsx).
- `next-mdx-remote` component overrides.
- Next.js `Link`.
- Material UI dialog, image, theme, and responsive breakpoint components.

## Current limitations

- There is no per-image opt-out for lightbox behavior.
- There is no image loading, optimization, error, or fallback state.
- Link classification only checks whether the URL starts with `http`.
- Whether the current image styling is required across all consuming applications requires product confirmation.
