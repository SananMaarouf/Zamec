import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const isAboutPage = router.pathname === '/about';
  const isPostsPage = router.pathname === '/posts';

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            <span className="text-2xl font-bold hover:underline">Zamec</span>
          </Link>

          <div className="hidden space-x-6 md:block">
            <Link
              href="/about"
              title="About Me"
              className={`hover:underline ${
                isAboutPage ? 'rounded-full border-2 border-gray-600 px-4 py-2' : ''
              }`}
            >
              {t('header.about')}
            </Link>
            <Link
              href="/posts"
              title="Projects"
              className={`hover:underline ${
                isPostsPage ? 'rounded-full border-2 border-gray-600 px-4 py-2' : ''
              }`}
            >
              {t('header.posts')}
            </Link>
            <Link
              href="#contact"
              onClick={e => {
                e.preventDefault();
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:underline"
            >
              {t('header.contact')}
            </Link>
          </div>

          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
