import PropTypes from 'prop-types';
import { AiOutlineMail } from 'react-icons/ai';

function En() {
  return (
    <div className='space-y-4 leading-relaxed'>
      <p>
        When you create an Pinfollower account or when you use Pinfollower, you
        are deemed to accept to comply with and follow all applicable
        legislation and regulations and all applicable local legislation. It is
        strictly forbidden to use Pinfollower if you do not accept any of these
        above-mentioned terms and conditions.
      </p>

      <Heading>Revenue Source</Heading>
      <p>
        You accept that we might show you the advertisement paid by the
        businesses and institutions for promotion purposes instead of making a
        payment to use Pinfollower. We use your personal data including but not
        limited to data regarding your behaviors and fields of interest to show
        you a more relevant advertisement. We show your relevant and helpful
        advertisement without disclosing your identity to the advertisers. We do
        not sell your personal data. We permit the advertisers to inform us
        about their target audience or similar data for their commercial targets
        and show their advertisements. Then, we show the advertisement to
        relevant individuals. Additionally, we provide regular ad performance
        reports to advertisers to help the advertisers understand how the
        individuals inside or outside Pinfollower interact with the content. We
        do not share personal identifiers unless explicit permission is provided
        by you. On Pinfollower, you can see branded content shared by the
        account owners promoting their products or services based on a
        commercial relationship with the business partner expressed in the
        content.
      </p>

      <Heading>Your Commitments</Heading>
      <p>You cannot undertake the following actions by using Pinfollower.</p>
      <ul className='list-disc ml-6'>
        <li>You cannot act as another individual and take their identity.</li>
        <li>You cannot provide inaccurate information.</li>
        <li>
          You cannot commit any act against the law by providing misleading or
          fraudulent information illegal or any illegal or unauthorized
          activity.
        </li>
        <li>
          You cannot attempt to create accounts, access data or collect data in
          an unauthorized way.
        </li>
        <li>
          You cannot sell, license or purchase any account or data obtained from
          Pinfollower.
        </li>
        <li>
          You cannot share the personal or private information of other
          individuals without any prior consent or commit any act to violate the
          rights of other individuals including but not limited to intellectual
          property rights.
        </li>
        <li>
          You cannot change our products or components, translate the products,
          create derivatives or apply reverse engineering.
        </li>
      </ul>
      <p>
        With this Agreement, you grant certain required permissions to us to
        offer you this service.
      </p>
      <ul className='list-disc ml-6'>
        <li>
          The ownership of the content will belong to you; however, you grant a
          license to use your content. We shall have no ownership claim on any
          content you have shared on Pinfollower. With that, we need certain
          legal permissions (license) from you to offer you services. When you
          share (upload) the content under intellectual property rights (such as
          texts, photos or videos) on Pinfollower, you grant us non-exclusive,
          royalty-free, transferrable, sublicensable, international license to
          host, use, change, distribute, copy, run, show on public domain,
          translate and create derivates of such content. This license will
          terminate when your content is deleted from our systems. You can
          delete the content separately or collectively by deleting your
          account.
        </li>
        <li>
          You permit us to use your username, profile picture, information about
          your relationships and actions with accounts, ads and sponsored
          content. For example, we can show you that you have liked a sponsored
          Pin created by a brand that pays us to show the brand ad on
          Pinfollower.
        </li>
      </ul>
      <Heading>Additional Reserved Rights</Heading>
      <ul className='list-disc ml-6'>
        <li>
          If it is necessary, we can change your username (for example,
          violating the intellectual property rights of other individuals or
          taking the identity of another user).
        </li>
        <li>
          You need prior written permission from us to change our software,
          create derivatives, turn into source code or retrieve codes in any
          other forms.
        </li>
        <li>
          You cannot use our intellectual property, trademark or similar brands
          and marks without prior written permission.
        </li>
        <li>
          If we believe you have violated the Terms of Use, we reserve the right
          to remove or block any content or information you have shared on
          Pinfollower as permitted by the related law or as deemed necessary.
        </li>
      </ul>

      <Heading>Limitation of Liabilities</Heading>
      <p>
        You accept and declare that Pinfollower shall not be held responsible
        for any direct, indirect, accidental, coincidental or quintessential
        damages. These damages include but are not limited to profit losses,
        interrupted business, business reputation or loss of goodwill, data loss
        with programs or other non-tangible losses due to incorrect information
        use, permanent or temporary inaccessibility of these services or
        information, deleting any information, misuse of any information or any
        errors in storing any information or content. The abovementioned
        limitations are valid and applicable regardless of Pinfollower being
        informed or aware of the possibility of such damages. The liabilities of
        Pinfollower are limited with the largest extend permitted by the law for
        disclaimer or limitation of liability or disallowed jurisdiction for
        accidental damages.
      </p>

      <Heading>Amendments</Heading>
      <p>
        Pinfollower reserves the right to make amendments to this Terms of Use
        without prior notice. By using Pinfollower, you are deemed to accept the
        latest version of the Terms of Use.
      </p>

      <Heading>Applicable Law</Heading>
      <p>
        These terms and provisions are subjected to Turkish law and interpreted
        against these laws; you are irrevocable subjected to the exclusive
        jurisdiction of the courts in the related state or region.
      </p>

      <p>Please contact us if you have any questions:</p>
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

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default En;
