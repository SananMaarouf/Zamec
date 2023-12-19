import { HTMLProps } from 'react';
import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import Carousel from 'react-grid-carousel';

interface SliderProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleSlider = ({ articles }: SliderProps) => {
  return articles && articles.length > 0 ? (
    <Carousel
      cols={3}
      rows={1}
      gap={10}
      loop
      autoplay={3000}
      responsiveLayout={[
        {
          breakpoint: 990,
          cols: 2,
          autoplay: 3000,
        },
        {
          breakpoint: 570,
          cols: 1,
          autoplay: 3000,
        },
      ]}
      mobileBreakpoint={300}
    >
      {articles.map((article, index) => {
        return article ? (
          <Carousel.Item>
            <div key={index}>
              <ArticleTile article={article} />
            </div>
          </Carousel.Item>
        ) : null;
      })}
    </Carousel>
  ) : null;
};
