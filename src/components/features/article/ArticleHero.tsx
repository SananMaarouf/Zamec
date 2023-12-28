import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Slider from 'react-slick';
import { twMerge } from 'tailwind-merge';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

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
}

export const ArticleHero = ({ article }: ArticleHeroProps) => {
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
      <div className="xl:pl-12 relative flex flex-1 basis-1/2 flex-col justify-center px-4 py-6 lg:py-12">
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

      <div className="xl:px-24 flex max-w-xl flex-col px-4 pb-6 lg:px-16 ">
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
                  <button onClick={open} className="h-full self-center md:mx-auto">
                    <div ref={ref}>
                      <Image
                        src={imageAsset?.url?.toString() ?? ''}
                        width={imageAsset?.width ?? 0}
                        height={imageAsset?.height ?? 0}
                        alt={imageAsset?.fileName ?? ''}
                        priority={true}
                      />
                    </div>
                  </button>
                )}
              </Item>
            )) || null}
          </Slider>
        </Gallery>
      </div>
    </div>
  );
};
