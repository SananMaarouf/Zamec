import { GetStaticProps } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { Container } from '@src/components/shared/container';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const About = () => {
  /* const { t } = useTranslation(); */

  return (
    <Container>
      <h1>About Me</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl id aliquam
        tincidunt, nunc nunc lacinia nunc, id lacinia nunc risus in lectus. Sed auctor, mauris id
        aliquam tincidunt, nunc nunc lacinia nunc, id lacinia nunc risus in lectus.
      </p>
      <p>
        Phasellus auctor, mauris id aliquam tincidunt, nunc nunc lacinia nunc, id lacinia nunc risus
        in lectus. Sed auctor, mauris id aliquam tincidunt, nunc nunc lacinia nunc, id lacinia nunc
        risus in lectus.
      </p>
      <p>
        Donec auctor, mauris id aliquam tincidunt, nunc nunc lacinia nunc, id lacinia nunc risus in
        lectus. Sed auctor, mauris id aliquam tincidunt, nunc nunc lacinia nunc, id lacinia nunc
        risus in lectus.
      </p>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default About;
