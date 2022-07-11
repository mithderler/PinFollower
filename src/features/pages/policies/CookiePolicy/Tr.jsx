import PropTypes from 'prop-types';
import { AiOutlineMail } from 'react-icons/ai';

function Tr() {
  return (
    <div className='space-y-4 leading-relaxed'>
      <Heading>Çerezler Nedir?</Heading>
      <p>
        Çerezler, ziyaret ettiğiniz web siteleri tarafından bilgisayarınıza veya
        mobil cihazınıza depolanan küçük metin dosyalarıdır.
      </p>
      <Heading>Kullandığımız Çerezler</Heading>
      <p>
        <strong>Hesapla ilgili çerezler</strong>
      </p>
      <p>
        Pinfollower&#39;da bir hesap oluşturursanız, kayıt işleminin yönetimi ve
        genel yönetim için çerezleri kullanırız. Bu çerezler genellikle
        oturumunuzu kapattığınızda silinir, ancak bazı durumlarda oturumu
        kapattığınızda sonradan site tercihlerinizi hatırlamak için
        kalabilirler.
      </p>
      <p>
        <strong>Giriş yapma ile ilgili çerezler</strong>
      </p>
      <p>
        Giriş yaptığınızda bunu hatırlayabilmemiz için çerezleri kullanırız.
        Bunun sebebi yeni bir sayfayı her ziyaret ettiğinizde tekrar oturum
        açmanızı önlemektir. Bu çerezler, oturum açtığınızda yalnızca
        kısıtlanmış özelliklere ve alanlara erişebildiğinizden emin olmak için
        oturumu kapattığınızda temizlenir.
      </p>
      <p>
        <strong>Site tercihleri ile ilgili çerezler</strong>
      </p>
      <p>
        Pinfollower&#39;da size iyi bir deneyim sunmak için, siteyi
        kullandığınız esnada nasıl çalışacağına ilişkin tercihlerinizi ayarlama
        işlevselliğini sağlıyoruz. Bir sayfayla etkileşime girdiğinizde
        tercihlerinizin hatırlanması için çerezleri kullanmamız gerekir.
      </p>
      <p>
        <strong>E-posta bültenleri ile ilgili çerezler</strong>
      </p>
      <p>
        Bu site, haber bülteni veya e-posta abonelik hizmetleri sunmaktadır.
        Kayıtlı olup olmadığınızı ve yalnızca abone olan veya abone olmayan
        kullanıcılar için geçerli olabilecek belirli bildirimlerin gösterilip
        gösterilmeyeceğini hatırlamak için çerezler kullanılabilir.
      </p>
      <Heading>Üçüncü Şahıs Çerezleri</Heading>
      <p>
        Bazı özel durumlarda güvenilir üçüncü şahıslar tarafından sağlanan
        çerezleri kullanmaktayız. Çerezleri tarayıcınızı ayarlayarak yönetebilir
        ve silebilirsiniz. Ancak bu, sayfamızın bazı özelliklerinden
        yararlanmanıza engel olabilir.
      </p>
      <Heading>Daha Fazla Bilgi</Heading>
      <p>Daha fazla bilgi isterseniz bizimle iletişime geçebilirsiniz:</p>
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

export default Tr;
