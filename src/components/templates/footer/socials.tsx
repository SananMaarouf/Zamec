import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import { Container } from '@src/components/shared/container';

export const Socials = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-center">{t('footer.socials')}</h2>
      <Container className="mt-1 max-w-[26rem] md:mt-5">
        <a
          className="flex flex-row justify-center rounded-lg bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 "
          href="https://www.instagram.com/zamec.art/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mr-2 w-8 self-center">
            <FontAwesomeIcon icon={faInstagram} style={{ color: '#ffffff' }} />
          </button>
          <p className="py-2 text-lg font-semibold text-white">Instagram</p>
        </a>
      </Container>
    </div>
  );
};
