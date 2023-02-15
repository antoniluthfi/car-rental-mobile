import Accordion from 'react-native-collapsible/Accordion';
import {h1} from 'utils/styles';
import {ic_arrow_down} from 'assets/icons';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {useState} from 'react';

const SECTIONS = [
  {
    title: 'Mengapa harus rental dan sewa mobil di Get & Ride?',
    content:
      'Dengan rental dan sewa mobil di Get & Ride, kamu nggak perlu repot lagi. Semua serba mudah, cepat, dan pastinya terpercaya. Kamu bisa menghemat waktu dan biaya. Selain itu juga bisa memilih mobil untuk liburan keliling kota Bali sesuai dengan kebutuhan dengan harga terbaik.',
  },
  {
    title: 'Bagimana cara rental dan sewa mobil di Get & Ride?',
    content:
      'Kamu dapat melakukan rental dan sewa mobil melaui website maupun aplikasi Get&Ride. Berikut langkah yang bisa kamu ikuti:\n\n● Masuk atau Daftar untuk bisa melakukan reservasi di aplikasi.\n\n● Pilih sewa mobil lepas kunci atau dengan supir.\n\n● Isi lokasi, waktu, dan durasi sewa yang diinginkan.\n\n● Pilih jenis mobil.Pastikan kamu membaca dan setuju dengan Rental Terms & Conditions serta Policy Conditions.\n\n● Pilih detail pengambilan mobil.Kamu bisa mengambil langsung ke tempat rental atau memilih untuk diantarkan ke tempatmu.\n\n● Pastikan kamu sudah mengisi dan mengupload data diri seperti seperti foto KTP dan SIM.\n\n● Periksa kembali pesananmu\n\n● Lakukan pembayaran',
  },
  {
    title: 'Apakah saya harus memiliki SIM untuk menyewa mobil di Get & Ride?',
    content:
      'Untuk rental dan sewa mobil di Get & Ride, penyewa lepas kunci wajib untuk memiliki dan menunjukkan KTP/SIM A untuk wisatawan domestik dan SIM Internasional/Paspor untuk wisatawan non domestik. Pastikan juga seluruh dokumen asli, tidak mengatasnamakan orang lain, dan masih aktif.',
  },
  {
    title: 'Apakah ada batasan usia untuk menyewa mobil di Get & Ride?',
    content:
      'Penyewa wajib berusia diatas 17 tahun dan harus menunjukkan Identification Card (KTP)/SIM A atau SIM Internasional/Paspor yang masih aktif.',
  },
  {
    title:
      'Apakah ada biaya tambahan yang harus dibayar saat mengambil atau mengembalikan mobil?',
    content:
      'Jika mengambil dan mengembalikan mobil sewa langsung di rental place, maka tidak dikenakan biaya apapun (gratis). Jika mobil sewa ingin dikirim dan dikembalikan di tempat penyewa (diluar rental place) maka akan dikenakan biaya tambahan tergantung jarak yang ditentukan.',
  },
  {
    title: 'Bagaimana cara mengubah / membatalkan booking mobil rental?',
    content:
      'Untuk pengajuan reschedule sewa mobil dapat menghubungi whatsapp kami di +62 81262511511. Pastikan kamu sudah memahami ketentuan refund dan reschedule yang sudah diinfokan. Jika kamu ingin mengetahui status reschedule tiket Sewa Mobil kamu, kamu dapat menghubungi Whatsapp kami untuk info yang lebih detail.',
  },
];

export default function FAQ() {
  const [activeSections, setActiveSections] = useState([]);

  const _renderHeader = (section: any, i: any, isActive: any) => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: i % 2 !== 0 ? '#fff' : '#F5F6FA',
            paddingHorizontal: 10,
          },
        ]}>
        <Text
          allowFontScaling={false}
          style={[styles.headerText, {width: '80%'}]}>
          {i + 1}. {section.title}
        </Text>
        {isActive ? (
          <Image
            source={ic_arrow_down}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Image
            source={ic_arrow_down}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
    );
  };

  const _renderContent = (section: any) => {
    return (
      <View style={styles.content}>
        <Text allowFontScaling={false} style={{fontSize: 12, lineHeight: 20}}>
          {section.content}
        </Text>
      </View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  const _renderFooter = () => {
    return <View style={styles.footer} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={[h1, styles.title]}>FAQ</Text>
      <Accordion
        underlayColor={'#FFF'}
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        renderFooter={_renderFooter}
        containerStyle={{padding: 16}}
        expandMultiple={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    alignSelf: 'center',
    color: theme.colors.navy,
    marginTop: 20,
  },
  header: {
    paddingVertical: 16,
    borderColor: '#C4C4C4',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footer: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  headerText: {
    fontSize: 14,
  },
  headerTextRotate: {
    transform: [{rotate: '180deg'}],
    fontSize: 12,
  },
  content: {
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  textContent: {},
});
