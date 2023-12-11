import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import { Gallery, Item } from 'react-photoswipe-gallery';

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
}

/**
 * ArticleHero.tsx is a React component responsible for
 * rendering the hero section of a blog post in the index page and
 * on the [slug].page.tsx page
 *
 * It accepts an `article` object, `isFeatured` boolean,
 * and `isReversedLayout` boolean as props.
 *
 * The `article` object contains the
 * blog post data fetched from the Contentful CMS.
 *
 * The `isFeatured` prop is optional and
 * indicates whether the blog post is featured.
 *
 * The `isReversedLayout` prop is also optional and
 * determines the layout of the hero section.
 * If it's true, the layout is reversed.
 *
 * The component uses the `useTranslation` hook for
 * internationalization and
 * the `useContentfulInspectorMode` hook for Contentful inspector mode.
 *
 * The hero section consists of
 * the blog post title, short description, published date, and featured image.
 *
 * The `CtfImage` component is used to
 * display the featured image,
 * and the `FormatDate` component is used to format the published date.
 */
export const ArticleHero2 = ({
  article,
  isFeatured,
  isReversedLayout = false,
}: ArticleHeroProps) => {
  const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  const { title, shortDescription, publishedDate } = article;

  return (
    <div className="relative flex flex-1 basis-1/2 flex-col justify-center py-6 px-4 lg:px-16 lg:py-12 xl:px-24">
      {/* TODO: make work */}
      {/* <Gallery>
                {article.imageAssets.map((imageAsset, index) => (
                    <Item
                        key={index}
                        original={imageAsset.url}
                        thumbnail={imageAsset.url} // Replace with actual thumbnail URL if available
                        width={imageAsset.width}
                        height={imageAsset.height}
                    >
                        {({ ref, open }) => (
                            <img ref={ref} onClick={open} src={imageAsset.url} alt={imageAsset.title} />
                        )}
                    </Item>
                ))}
            </Gallery> */}
    </div>
  );
};
