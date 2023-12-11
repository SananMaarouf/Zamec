import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import Slider from 'react-slick';

import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface SliderProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleSlider = ({ articles, className, ...props }: SliderProps) => {
  const settings = {
    className: twMerge('center', className),
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return articles && articles.length > 0 ? (
    <Slider {...settings}>
      {articles.map((article, index) => {
        return article ? (
          <div key={index}>
            <ArticleTile article={article} />
          </div>
        ) : null;
      })}
    </Slider>
  ) : null;
};
