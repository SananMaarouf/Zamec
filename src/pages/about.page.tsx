import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { getServerSideTranslations } from './utils/get-serverside-translations';
import { CtfRichText, CtfImage } from '@src/components/features/contentful';
import { Container } from '@src/components/shared/container';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

/**
 * about.page.tsx is a Next.js page component responsible for:
 * - getting and rendering about me section.
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
 * The page layout consists of a title and an  component:
 * - The title is localized using the useTranslation hook from next-i18next.
 *
 * The page is wrapped in a Container component for consistent layout and spacing.
 */

const About = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const page = useContentfulLiveUpdates(props.page);
  return (
    <>
      <Container className="flex flex-col rounded-2xl ">
        {/* this is for the title, always on top */}
        <h1 className="relative mx-auto flex px-4 py-6 lg:pt-12 ">{t('about.title')}</h1>
        {/* this is for the image and text. on mobile view they're stacked.
            on tablet and desktop they are next to eachother */}
        {/* when mobile it's 1 column. when breakpoint md hits it's 2 columns. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:pb-6">
          {/* this is for the image */}
          <div className="order-1 flex h-full max-w-screen-lg overflow-hidden rounded-lg pb-2 lg:order-2">
            <CtfImage
              sys={page}
              url={page?.portrait.url}
              height={page?.portrait.height}
              width={page?.portrait.width}
              nextImageProps={{ className: 'object-contain rounded-lg' }}
            />
          </div>
          {/* this is for the text */}
          <div className="order-2 mt-2 pr-4 md:pb-10 lg:order-1">
            <CtfRichText json={page?.description?.json} />
          </div>
        </div>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    /* ok this succesfully gets the title, description and portrait url */
    const PostsData = await gqlClient.pageAboutMe({ locale, preview });
    const page = PostsData.pageAboutMeCollection?.items[0];

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
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default About;
