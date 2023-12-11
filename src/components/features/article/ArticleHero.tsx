import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { ArticleLabel } from '@src/components/features/article/ArticleLabel';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
}

/* This is for the featured post in the index and when you click in on a post */
export const ArticleHero = ({
  article,
  isFeatured,
  isReversedLayout = false,
}: ArticleHeroProps) => {
  const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  const { title, shortDescription, publishedDate } = article;

  return (
    <div
      className={twMerge(
        `flex flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg`,
        isReversedLayout ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      <div className="flex-1 basis-1/2" {...inspectorProps({ fieldId: 'featuredImage' })}>
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{ className: 'w-full', priority: true, sizes: undefined }}
            {...article.featuredImage}
          />
        )}
      </div>

      <div className="relative flex flex-1 basis-1/2 flex-col justify-center py-6 px-4 lg:px-16 lg:py-12 xl:px-24">
        <div className="flex flex-wrap items-center">
          {/* when desktop */}
          <div
            className={twMerge(
              'ml-auto hidden pl-2 text-xs text-gray600',
              isReversedLayout ? 'lg:block' : '',
            )}
            {...inspectorProps({ fieldId: 'publishedDate' })}
          >
            <FormatDate date={publishedDate} />
          </div>
        </div>
        <h1 {...inspectorProps({ fieldId: 'title' })}>{title}</h1>
        {shortDescription && (
          <p className="mt-2" {...inspectorProps({ fieldId: 'shortDescription' })}>
            {shortDescription}
          </p>
        )}
        {/* when mobile */}
        <div
          className={twMerge('mt-2 text-xs text-gray600', isReversedLayout ? 'lg:hidden' : '')}
          {...inspectorProps({ fieldId: 'publishedDate' })}
        >
          <h1>mobile</h1>
          <FormatDate date={publishedDate} />
          <h2> im here </h2>
        </div>
      </div>
    </div>
  );
};
