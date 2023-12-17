import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Contact } from './contact';
import { Socials } from './socials';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="border-t-color border-gray200 mt-10 border-t">
      {/* <hr className="mb-3"></hr> */}
      <h2 className="mb-2 text-center text-2xl">{t('footer.contact.title')}</h2>
      <div className="border-b-color border-gray200 mt-10 flex flex-col justify-center border-b pb-5 md:flex-row">
        <Socials />
        <Contact />
      </div>
      <Container className="py-8 text-center">
        <div className="">
          {t('footer.developedBy')}{' '}
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
