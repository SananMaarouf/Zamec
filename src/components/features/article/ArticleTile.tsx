import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}
/**
 * ArticleTile.tsx is a React component responsible for:
 * - rendering a single blog post tile.
 *
 * It accepts an:
 * - `article` object and
 * - `className` as props.
 *
 * The `article` object contains:
 * - the blog post data fetched from the Contentful CMS.
 *
 * The `className` prop is optional and can be used to:
 * - apply additional CSS classes to the component.
 *
 * The component uses the `useContentfulInspectorMode` hook for Contentful inspector mode.
 *
 * The tile consists of a blog post:
 * - featured image,
 * - title,
 * - published date.
 *
 * The `CtfImage` component is used to display the featured image.
 * The `FormatDate` component is used to format the published date.
 *
 * The tile is wrapped in a `Link` component,
 * which makes the entire tile clickable and navigates to the blog post page when clicked.
 */
export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { title, publishedDate } = article;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    /* had to add w-full h-full to these two containers and on
       the div on articleslider.tsx */
    <Link className="flex h-full w-full flex-col" href={`/${article.slug}`}>
      <div className="border-gray300 flex h-full w-full flex-col overflow-hidden rounded-2xl border shadow-sm">
        {article.featuredImage && (
          <div {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'object-cover aspect-[16/10] w-full' }}
              {...article.featuredImage}
            />
          </div>
        )}
        <div className="mb-2 mt-2 flex h-20 px-4 md:h-28">
          {title && (
            <h2
              className="text-gray800 lg:text-2xl text-lg md:mb-3 md:text-sm"
              {...inspectorProps({ fieldId: 'title' })}
            >
              {title}
            </h2>
          )}
        </div>
      </div>
    </Link>
  );
};
