import { GetStaticProps } from 'next';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';
import { Container } from '@src/components/shared/container';
import { useForm, ValidationError } from '@formspree/react';
import { useTranslation } from 'next-i18next';
export const Contact = () => {
  const { t } = useTranslation();

  const [state, handleSubmit, resetForm] = useForm('mayrwqwg');

  if (state.succeeded) {
    return (
      <Container className="bg-gray-200 my-10 flex flex-col items-center justify-center">
        <h2>{t('footer.contact.success.messageSent')}</h2>
        <button
          onClick={resetForm}
          className="bg-blue-500 hover:bg-blue-700 text-white mt-4 rounded py-2 px-4 font-bold"
        >
          {t('footer.contact.success.sendNew')}
        </button>
      </Container>
    );
  }

  return (
    /* add flex-row when you want to implement a sitemap or another column  */
    <Container className="bg-gray-200 mt-5 flex flex-col justify-center ">
      <form onSubmit={handleSubmit} className="bg-white mx-auto max-w-xl rounded-lg p-6 shadow-lg ">
        <h2 className="my-2 text-2xl font-bold">{t('footer.contact.title')} 😊</h2>
        <label htmlFor="email" className="text-gray-700 mb-2 block text-sm font-bold">
          {t('footer.contact.form.email')}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="text-gray-700 focus:shadow-outline mb-4 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="message" className="text-gray-700 mb-2 block text-sm font-bold">
          {t('footer.contact.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          className="text-gray-700 focus:shadow-outline mb-4 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <button
          type="submit"
          disabled={state.submitting}
          className="border-transparent text-white bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          {t('footer.contact.form.submit')}
        </button>
        <ValidationError errors={state.errors} />
      </form>
    </Container>
  );
};
