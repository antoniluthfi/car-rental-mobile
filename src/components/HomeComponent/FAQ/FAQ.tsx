import Accordion from 'react-native-collapsible/Accordion';
import React, {useState} from 'react';
import {h1} from 'utils/styles';
import {ic_arrow_down} from 'assets/icons';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';

const SECTIONS = [
  {
    title: 'Mengapa harus rental dan sewa mobil di Get & Ride?',
    content: 'Semua produk bisa dilihat di website dan Aplikasi kami.',
  },
  {
    title: 'Bagimana cara rental dan sewa mobil di Get & Ride?',
    content:
      'Aroma Medan terletak di Golf Island, Jalan Pantai Indah Kapuk No.27, Jakarta Utara.',
  },
  {
    title: 'Apakah saya harus memiliki SIM untuk menyewa mobil di Get & Ride?',
    content:
      'Kamu bisa beli produk Aroma Medan dengan cara : datang langsung ke outlet kami di Golf Island, melalui apps atau website kami di www.aromamedan.com, melalui Direct Message Instagram / Facebook kami, atau bisa juga melalui WhatsApp kami di nomor : +62 822 1198 9898.',
  },
  {
    title: 'Apakah ada batasan usia untuk menyewa mobil di Get & Ride?',
    content:
      'Untuk saat ini, Aroma Medan belum memiliki cabang. Silahkan pesan produk Aroma Medan melalui berbagai cara yang telah tersedia.',
  },
  {
    title:
      'Apakah ada biaya tambahan yang harus dibayar saat mengambil atau mengembalikan mobil?',
    content:
      'Silahkan lihat menu kami pada halaman utama aplikasi ini. Jika ada produk kami yang ingin kamu beli, silahkan tambahkan ke keranjang dan lakukan pembayaran. Semua pesanan yang kamu buat, akan segera kami proses dan antar ke tempat kamu.',
  },
  {
    title: 'Bagaimana cara mengubah / membatalkan booking mobil rental?',
    content:
      'Untuk memastikan produk yang kami buat masih dalam keadaan fresh ketika sampai di tempat kamu, kami hanya melayani pengantaran ke Jakarta, Depok, Tangerang, dan Bekasi saja. Namun, kamu juga dapat melakukan pengambilan langsung ke outlet kami.',
  },
];

export default function FAQ() {
  const [activeSections, setActiveSections] = useState([]);

  const _renderSectionTitle = (section: any) => {
    return (
      <View style={styles.content}>
        <Text allowFontScaling={false} style={styles.textContent}>
          {section.content}
        </Text>
      </View>
    );
  };

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
        <Text allowFontScaling={false} style={{fontSize: 12}}>
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
  },
  textContent: {},
});
