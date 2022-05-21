import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';

function En() {
  return (
    <div className='space-y-4 leading-relaxed'>
      <p>We care about the privacy of your personal data.</p>
      <p>
        We only collect your personal data when we need such data to offer our
        services based on your information and consent legally and fairly.
      </p>
      <p>
        We store the collected data throughout the necessary period required to
        offer the service requested by you. We will protect the stored data
        against loss, theft, unauthorized access, disclosure, copy, usage or
        editing in a commercially acceptable sense.
      </p>
      <p>
        On Pinfollower, we offer certain services that require third parties to
        enable us to use our certain properties and/or integrate third-party
        services and applications via our platform. In such cases, we share your
        personal data with third parties to complete your request or provide the
        requested services within the limits of your permission.
      </p>
      <p>
        We do not disclose or share your personal data with third parties
        without open consent or request or any legal obligation.
      </p>
      <p>
        You have the right to deny our access to your personal data if we are
        unable to offer you some of your requested services.
      </p>
      <p>
        Continuing to use Pinfollower shall be deemed as accepting our privacy
        policies and personal data practices. You can contact us if you have any
        questions regarding user data and usage of your personal data.
      </p>
      <p>This Policy is valid as of 21 December 2021.</p>
      <p>
        If you have any questions or complaints regarding this Privacy Policy or
        usage of your personal data, please contact us:
      </p>
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

export default En;
