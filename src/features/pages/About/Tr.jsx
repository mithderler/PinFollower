import PropTypes from 'prop-types';

function Tr() {
  return (
    <div className='space-y-4 leading-relaxed'>
      <Heading>Pinfollower Nedir?</Heading>
      <p>
        Pinfollower, gezilebilecek yerleri, restoranları, yapılabilecek
        etkinlikleri ve çok daha fazlasını keşfedebileceğiniz yerdir.
      </p>
      <p>
        Gittiğiniz bir yer için Pin oluşturup takipçilerinizle
        paylaşabilirsiniz. Aynı şekilde takip ettiğiniz kişilerin Pinlerini
        keşfedebilirsiniz.
      </p>
      <p>
        Kendi oluşturduğunuz Pinleri ya da başkalarının Pinlerini panolara
        ekleyerek gruplama yapabilirsiniz.
      </p>

      <Heading>Pin Oluşturma</Heading>
      <p>
        Pin oluşturarak takipçilerinize gittiğiniz bir yeri anlatabilirsiniz.
        Gittiğiniz yer bir restoran ise beğendiğiniz yemekleri fotoğraflarıyla
        birlikte paylaşabilirsiniz. Gittiğiniz yer manzaralı bir dağın tepesi
        ise hissettiklerinizi fotoğraflarla beraber paylaşabilirsiniz.
      </p>
      <p>
        Pin oluşturmak için başlık belirleyin ve Pinin konumunu girin. Akış
        ekranı için kapak fotoğrafı ve kapak fotoğrafı açıklaması
        ekleyebilirsiniz. Pin detaylarını ise fotoğraflarla beraber Pin açıklama
        alanına ekleyebilirsiniz. İsterseniz Pin için etiket ekleyebilirsiniz.
        Mesela oluşturduğunuz Pin bir restoran için ise <i>restoran</i> ve{' '}
        <i>yemek</i> etiketlerini ekleyebilirsiniz.
      </p>

      <Heading>Pano Oluşturma</Heading>
      <p>
        Oluşturduğunuz Pinleri ya da beğendiğiniz Pinleri gruplamak için pano
        oluşturabilirsiniz.
      </p>
      <p>
        Örneğin; 3-4 günlük gezi için Kapadokyaya gittiniz. Kapadokyada yemekler
        yediniz, kahve içtiniz, balona bindiniz, atv kullandınız. Yaptığınız her
        etkinlik için Pin oluşturabilirsiniz. Kapadokya Pinlerinizi gruplamanız,
        sizin için ve takipçileriniz için faydalı olacaktır. Bunun için
        Kapadokya adında bir pano oluşturup ilgili Pinlerinizi bu panoya
        ekleyebilirsiniz.
      </p>
      <p>
        Pano herkese açık ya da gizli olabilir. Gizli olduğu zaman başkaları
        panonuzu göremez. Gezi planı yaparken gizli pano oluşturup beğendiğiniz
        Pinleri bu panoya ekleyebilirsiniz.
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
