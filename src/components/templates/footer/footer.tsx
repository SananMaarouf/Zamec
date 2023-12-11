import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t-color mt-10 border-t border-gray200">
      <Container className="py-8 text-center">
        <hr className="mb-3"></hr>
        <div className="">
          Developed by{' '}
          <a
            href="http://www.sanan.no"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Sanan Maarouf
          </a>
        </div>
      </Container>
    </footer>
  );
};
