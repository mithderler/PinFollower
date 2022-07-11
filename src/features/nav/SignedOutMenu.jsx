import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SignedOutMenu() {
  const { t } = useTranslation();

  return (
    <ul className='hidden md:flex md:justify-between md:items-center gap-3'>
      <Navlink name={t('navbar.navlinks.explore')} link='' />
      <Navlink name={t('navbar.navlinks.sign_in')} link='/users/sign_in' />
      <Navlink name={t('navbar.navlinks.sign_up')} link='/users/sign_up' />
    </ul>
  );
}

function Navlink({ name, link = '' }) {
  return (
    <li className='cursor-pointer transition ease-in delay-100 hover:text-main'>
      <Link to={link}>{name}</Link>
    </li>
  );
}

Navlink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default SignedOutMenu;
