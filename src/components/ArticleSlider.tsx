import { HTMLProps } from 'react';
import Slider from 'react-slick';
import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface SliderProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleSlider = ({ articles }: SliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: 'linear',

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
