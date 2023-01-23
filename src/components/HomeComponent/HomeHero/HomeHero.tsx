import {h1} from 'utils/styles';
import {iconSize, rowCenter, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  img_bicycle,
  img_car_3,
  get_ride_logo,
  img_motorcycle,
} from 'assets/images';
import {useState} from 'react';
import {
  ic_rent_bicycle,
  ic_rent_bicycle_active,
  ic_rent_car,
  ic_rent_car_active,
  ic_rent_motorcycle,
  ic_rent_motorcycle_active,
} from 'assets/icons';

const buttonList = [
  {
    id: 1,
    img: ic_rent_car,
    imgActive: ic_rent_car_active,
    imgBackground: img_car_3,
    title: 'Sewa Mobil',
  },
  {
    id: 2,
    img: ic_rent_motorcycle,
    imgActive: ic_rent_motorcycle_active,
    imgBackground: img_motorcycle,
    title: 'Sewa Motor',
  },
  {
    id: 3,
    img: ic_rent_bicycle,
    imgActive: ic_rent_bicycle_active,
    imgBackground: img_bicycle,
    title: 'Sewa Sepeda',
  },
];

const HomeHero: React.FC = () => {
  const [selected, setSelected] = useState(1);

  return (
    <View>
      <Image
        source={
          buttonList.find(button => button.id === selected)?.imgBackground
        }
        style={styles.imgCar}
        resizeMode="cover"
      />
      <Image
        source={get_ride_logo}
        style={styles.getRideLogo}
        resizeMode="cover"
      />

      <View style={styles.buttonMenu}>
        {buttonList.map((button, i) => (
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                backgroundColor:
                  selected === button.id ? 'white' : 'rgba(0, 0, 0, 0.5)',
                ...(button.id === 1 ? styles.buttonBorderLeft : {}),
                ...(button.id === 3 ? styles.buttonBorderRight : {}),
              },
            ]}
            onPress={() => setSelected(button.id)}
            key={i}>
            <View style={rowCenter}>
              <Image
                source={selected === button.id ? button.imgActive : button.img}
                resizeMode="cover"
                style={iconSize}
              />
              <Text
                style={[
                  h1,
                  styles.buttonName,
                  {
                    color: selected === button.id ? 'black' : 'white',
                  },
                ]}>
                {button.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeHero;

const styles = StyleSheet.create({
  imgCar: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT / 3,
  },
  getRideLogo: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '20%',
    height: 35,
  },
  buttonMenu: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonContainer: {
    flexBasis: '33%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
  },
  buttonBorderLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonBorderRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonName: {
    fontSize: 13,
  },
});
