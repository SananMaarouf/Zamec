import { useTranslation } from 'next-i18next';
import { Container } from '@src/components/shared/container';

export const Socials = () => {
  const { t } = useTranslation();
  return (
    <Container className="py-8 text-center">
      <h1 className="mb-3 text-2xl font-bold">{t('footer.socials')}</h1>

      <hr className="mb-3"></hr>
    </Container>
  );
};
