import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { getServerSideTranslations } from './utils/get-serverside-translations';
import { ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

/**
 * posts.page.tsx is a Next.js page component responsible for:
 * - rendering a list of all blog posts.
 *
 * It fetches all blog post data from:
 * - the Contentful CMS and displays them in a grid layout.
 *
 * The component uses getStaticProps for:
 * - data fetching at build time, which makes the page static and SEO-friendly.
 *
 * It also uses the useContentfulLiveUpdates hook to:
 * - enable live updates for the blog post content.
 *
 * The page layout consists of a title and an ArticleTileGrid component:
 * - The title is localized using the useTranslation hook from next-i18next.
 * - The ArticleTileGrid component is used to display the blog posts in a grid layout.
 *
 * The page is wrapped in a Container component for consistent layout and spacing.
 */

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const page = useContentfulLiveUpdates(props.page);
  const posts = useContentfulLiveUpdates(props.posts);

  if (!page?.featuredBlogPost || !posts) return;

  return (
    <>
      <Container className="my-8  md:mb-10 lg:mb-16">
        <h2 className="mb-4 md:mb-6">{t('posts.allPosts')}</h2>

        <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={posts} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    const PostsData = await gqlClient.pageLanding({ locale, preview });
    const page = PostsData.pageLandingCollection?.items[0];

    const blogPostsData = await gqlClient.pageBlogPostCollection({
      limit: 99,
      locale,
      order: PageBlogPostOrder.PublishedDateDesc,

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
