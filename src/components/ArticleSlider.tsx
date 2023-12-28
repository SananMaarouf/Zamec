import { HTMLProps } from 'react';
import Carousel from 'react-grid-carousel';
import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

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
      responsiveLayout={[
        {
          breakpoint: 990,
          cols: 2,
        },
        {
          breakpoint: 570,
          cols: 1,
        },
      ]}
      mobileBreakpoint={300}
    >
      {articles.map((article, index) => {
        return article ? (
          <Carousel.Item>
            <div key={index} className="flex h-full w-full flex-col">
              <ArticleTile article={article} />
            </div>
          </Carousel.Item>
        ) : null;
      })}
    </Carousel>
  ) : null;
};
