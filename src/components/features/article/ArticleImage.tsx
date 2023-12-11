import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { twMerge } from 'tailwind-merge';

import { CtfImage } from '@src/components/features/contentful';
import { ComponentRichImage } from '@src/lib/__generated/sdk';

interface ArticleImageProps {
  image: ComponentRichImage;
}
/**
 * ArticleImage.tsx is a React component responsible for:
 * - rendering an image within a blog post.
 *
 * It accepts an `image` object as a prop, which is of type `ComponentRichImage`.
 *
 * The `image` object contains the image data fetched from the Contentful CMS,
 * including the image source, caption, and whether it should be displayed full width.
 *
 * The component uses the `useContentfulInspectorMode` hook for Contentful inspector mode,
 * which allows for live preview and editing of the content.
 *
 * The image is wrapped in a `figure` element,
 * and if a caption is provided, it is displayed in a `figcaption` element below the image.
 *
 * The `CtfImage` component is used to display the image.
 * It receives the image data and additional CSS classes based on whether
 * the image should be displayed full width or not.
 *
 * If no image data is provided, the component returns `null`.
 */
export const ArticleImage = ({ image }: ArticleImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: image.sys.id });
  return image.image ? (
    <figure>
      <div className="flex justify-center" {...inspectorProps({ fieldId: 'image' })}>
        <CtfImage
          nextImageProps={{
            className: twMerge(
              'mt-0 mb-0 ',
              image.fullWidth
                ? 'md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0'
                : 'rounded-2xl border border-gray300 shadow-lg',
            ),
          }}
          {...image.image}
        />
      </div>
      {image.caption && (
        <figcaption className="mt-4" {...inspectorProps({ fieldId: 'caption' })}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  ) : null;
};
