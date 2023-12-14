import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';

import { ArticleHero } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { ArticleSlider } from '@src/components/ArticleSlider';
import { revalidateDuration } from '@src/pages/utils/constants';

import { getServerSideTranslations } from './utils/get-serverside-translations';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const page = useContentfulLiveUpdates(props.page);
  const posts = useContentfulLiveUpdates(props.posts);

  if (!page?.featuredBlogPost || !posts) return;

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <Container>
        <Link href={`/${page.featuredBlogPost.slug}`}>
          {/* TODO make articlehero render the image of the featured post on the index.  */}
          {/* alternatively if it is a featuredblogpost render a similar articlehero called featuredHero  */}
          <ArticleHero article={page.featuredBlogPost} isFeatured={true} />
        </Link>
      </Container>

      <Container className="mt-4">
        <h2 className="mb-2 md:mb-6">{t('landingPage.latestArticles')}</h2>
        <ArticleSlider articles={posts} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    const landingPageData = await gqlClient.pageLanding({ locale, preview });
    const page = landingPageData.pageLandingCollection?.items[0];

    const blogPostsData = await gqlClient.pageBlogPostCollection({
      /* here you can limit the amount of posts to be shown in the index */
      /* TODO: increase limit to 6 and create a carousel. showing 3 at a time 
          definetly steal the carousel code from sanan.no */
      limit: 6,
      locale,
      order: PageBlogPostOrder.PublishedDateDesc,
      where: {
        slug_not: page?.featuredBlogPost?.slug,
      },
      preview,
    });
    const posts = blogPostsData.pageBlogPostCollection?.items;

    if (!page) {
      return {
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        previewActive: !!preview,
        ...(await getServerSideTranslations(locale)),
        page,
        posts,
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
