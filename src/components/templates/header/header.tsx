import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            <span className="text-xl font-bold">Zamec</span>
          </Link>

          <div className="space-x-4">
            <Link href="/about" title="About Me">
              {t('header.about')}
            </Link>
            <Link href="/posts" title="Projects">
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
