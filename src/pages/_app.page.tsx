import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import './utils/globals.css';
import '@contentful/live-preview/style.css';
import { useRouter } from 'next/router';

import { Layout } from '@src/components/templates/layout';

// This is the main application file (_app.page.tsx) for a Next.js application.
// It's responsible for initializing all pages. It's a great place to put any application-wide logic.
// This file is also responsible for setting up the Contentful Live Preview Provider, which enables live updates and inspector mode for content previews.
// It also sets up internationalization with next-i18next.
// The Layout component is used to wrap all pages for consistent layout across the application.

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  return (
    <ContentfulLivePreviewProvider
      enableInspectorMode={pageProps.previewActive}
      enableLiveUpdates={pageProps.previewActive}
      locale={locale || 'en-US'}
    >
      <>
        <main className={`font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
        <div id="portal" className={`font-sans`} />
      </>
    </ContentfulLivePreviewProvider>
  );
};

export default appWithTranslation(App);
