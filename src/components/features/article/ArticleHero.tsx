import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import { CtfImage } from '@src/components/features/contentful';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Slider from 'react-slick';
import React, { useEffect } from 'react';

/**
 * This file defines a React component named `ArticleHero2` that is used to display a hero section for an article.
 * The component takes in an `article` object, a `isFeatured` boolean, and a `isReversedLayout` boolean as props.
 * The `article` object contains information about the article such as the title, short description, and published date.
 * The `isFeatured` boolean indicates whether the article is featured or not.
 * The `isReversedLayout` boolean indicates whether the layout of the component should be reversed or not.
 *
 * The component uses a slider with various settings for displaying the article information in a visually appealing way.
 * The slider settings include the number of slides to show,
 * the speed of the autoplay, the autoplay speed, the easing function for the animation, etc.
 * The slider is also responsive and adjusts its settings based on the viewport width.
 *
 * The component also uses the `useTranslation` hook for
 * - internationalization and
 * - the `useContentfulInspectorMode` hook for inspecting the Contentful entry of the article.
 */

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isIndexPage?: boolean;
  isReversedLayout?: boolean;
}

export const ArticleHero = ({ article, isFeatured, isIndexPage }: ArticleHeroProps) => {
  /* const { t } = useTranslation(); */
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, shortDescription, publishedDate } = article;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    draggable: true,
  };
  // hide the arrows in the slider
  /* perform DOM manipulations in a useEffect hook to 
     ensure they're executed on the client side after the component has been mounted.
  */
  useEffect(() => {
    // Get the next and prev arrows
    const nextArrow = document.querySelector('.slick-arrow.slick-next') as HTMLElement;
    const prevArrow = document.querySelector('.slick-arrow.slick-prev') as HTMLElement;

    // Hide the selected elements
    if (nextArrow && prevArrow) {
      nextArrow.style.display = 'none';
      prevArrow.style.display = 'none';
    }
  }, []);
  return (
    <div className="border-gray300 flex flex-col overflow-hidden rounded-2xl border md:flex-row landscape:flex-row">
      {/* the title, subtitle, date */}
      <div className="lg:py-12 xl:pl-12 relative flex flex-1 basis-1/2 flex-col justify-center px-4 py-6">
        <h1 {...inspectorProps({ fieldId: 'title' })}>{title}</h1>
        <div className="flex grow flex-col justify-between">
          {shortDescription && (
            <p className="mt-2 text-lg" {...inspectorProps({ fieldId: 'shortDescription' })}>
              {shortDescription}
            </p>
          )}
          <div
            className={twMerge('text-gray600 mr-auto hidden text-lg md:block')}
            {...inspectorProps({ fieldId: 'publishedDate' })}
          >
            <FormatDate date={publishedDate} />
          </div>
        </div>
      </div>
      {isFeatured && isIndexPage ? (
        /* On the index page an ArticleHero is rendered to show of the featuredBlogPost */
        /* to avoid creating an almost identical hero i just added a conditional check to 
            keep the ArticleHero reusable for the other posts.  */
        <div className="flex basis-1/2" {...inspectorProps({ fieldId: 'featuredImage' })}>
          {article.featuredImage && (
            <CtfImage
              nextImageProps={{ className: 'w-full', priority: true, sizes: undefined }}
              {...article.featuredImage}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col max-w-xl px-4 py-6 lg:px-16 xl:px-24 ">
          <Gallery>
            <Slider {...settings}>
              {article?.imageCollection?.items?.map((imageAsset, index) => (
                <Item
                  key={index}
                  original={imageAsset?.url ?? undefined}
                  width={imageAsset?.width?.toString()}
                  height={imageAsset?.height?.toString()}
                >
                  {({ ref, open }) => (
                    <button 
                      onClick={open} className='self-center md:mx-auto h-full'>
                      <img
                        ref={ref}
                        src={imageAsset?.url ?? undefined}
                        alt={imageAsset?.fileName ?? undefined}
                        className="w-full max-h-[30rem] object-cover"
                      />
                    </button>
                  )}
                </Item>
              )) || null}
            </Slider>
          </Gallery>
        </div>
      )}
    </div>
  );
};
