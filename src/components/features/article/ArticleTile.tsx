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
    <Link className="flex flex-col" href={`/${article.slug}`}>
      <div
        className={twMerge(
          'border-gray300 flex flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm',
          className,
        )}
      >
        {article.featuredImage && (
          <div {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'object-cover aspect-[16/10] w-full' }}
              {...article.featuredImage}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col px-4 py-3 md:px-5 md:py-4 lg:px-7 lg:py-5">
          {title && (
            <p className="h3 text-gray800 mb-2 md:mb-3" {...inspectorProps({ fieldId: 'title' })}>
              {title}
            </p>
          )}
          <div className="mt-auto flex items-center">
            <div
              className={twMerge('text-gray600 ml-auto pl-2 text-xs')}
              {...inspectorProps({ fieldId: 'publishedDate' })}
            >
              <FormatDate date={publishedDate} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
