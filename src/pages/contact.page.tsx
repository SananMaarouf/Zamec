import { GetStaticProps } from 'next';
import { Container } from '@src/components/shared/container';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  /* const { t } = useTranslation(); */

  const [state, handleSubmit] = useForm('YOUR_FORM_ID');

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <Container className="bg-gray-200 flex h-screen flex-col items-center justify-center md:flex-row">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg">
        <label htmlFor="email" className="text-gray-700 mb-2 block text-sm font-bold">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="text-gray-700 focus:shadow-outline mb-4 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="message" className="text-gray-700 mb-2 block text-sm font-bold">
          Message
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
          Submit
        </button>
        <ValidationError errors={state.errors} />
      </form>
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

export default Contact;
