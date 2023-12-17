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
              About Me
            </Link>
            <Link href="/posts" title="Projects">
              Projects
            </Link>
            {/* <Link href="#contact" title="Contact Me">
              Contact Me
            </Link> */}
          </div>

          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
