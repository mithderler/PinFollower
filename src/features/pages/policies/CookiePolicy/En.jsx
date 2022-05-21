import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';

function En() {
  return (
    <div className='space-y-4 leading-relaxed'>
      <Heading>What Is a Cookie?</Heading>
      <p>
        Cookies are small text files stored on your computer or mobile device by
        visited websites.
      </p>
      <Heading>Which Cookies Do We Use?</Heading>
      <p>
        <strong>Cookies related to account</strong>
      </p>
      <p>
        If you create an account on Pinfollower, we will use cookies for the
        management of registration and general management. These cookies are
        generally deleted when you sign off but might remain to remember your
        website preferences after signing off.
      </p>
      <p>
        <strong>Cookies related to logging in</strong>
      </p>
      <p>
        We use cookies to remember your log in. The reason to use these cookies
        is to prevent logging in to your account every time you visit a new
        page. These cookies are deleted when you log out to make sure that you
        can only access limited properties and fields when you log in.
      </p>
      <p>
        <strong>Cookies related to website preferences</strong>
      </p>
      <p>
        Pinfollower provides you preference setting functionality to decide how
        the website will work when you use it to offer a better experience. We
        need to use these cookies to remember your preferences when you interact
        with a page.
      </p>
      <p>
        <strong>Cookies related to the email newsletter</strong>
      </p>
      <p>
        This website offers newsletter or email subscription services. We might
        use cookies to remember whether you have subscribed to our newsletter or
        to only send certain notifications to subscribers.
      </p>
      <Heading>Third-Party Cookies</Heading>
      <p>
        In some special cases, we use cookies provided by reliable third
        parties. You can manage and delete your cookies from your browser
        settings. However, this might prevent you to benefit from certain
        properties and services on our pages.
      </p>
      <Heading>For more information</Heading>
      <p>Please contact us for more information:</p>
      <p>
        <a
          href='mailto:info@pinfollower.com'
          className='flex items-center text-main'
        >
          <AiOutlineMail /> <span className='ml-2'>info@pinfollower.com</span>
        </a>
      </p>
    </div>
  );
}

const Heading = ({ children }) => (
  <h3 className='text-xl font-semibold'>{children}</h3>
);

export default En;
