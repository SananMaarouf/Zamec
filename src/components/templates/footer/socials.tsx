import { Container } from '@src/components/shared/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export const Socials = () => {
  return (
    <div>
      <h2 className="text-center">Socials</h2>
      <Container className="mt-1 w-fit md:mt-5">
        <a
          className="flex flex-row justify-center rounded-md bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 px-2"
          href="https://www.instagram.com/zamec.art/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mr-2 w-5 self-center">
            <FontAwesomeIcon icon={faInstagram} style={{ color: '#ffffff' }} />
          </button>
          <p className="prose text-white">Instagram</p>
        </a>
      </Container>
    </div>
  );
};
