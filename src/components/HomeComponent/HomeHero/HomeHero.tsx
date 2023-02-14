import {get_ride_logo, img_hero_background} from 'assets/images';
import {h1} from 'utils/styles';
import {iconSize, rowCenter, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {
  ic_rent_bicycle,
  ic_rent_bicycle_active,
  ic_rent_car,
  ic_rent_car_active,
  ic_rent_motorcycle,
  ic_rent_motorcycle_active,
} from 'assets/icons';
import CarouselHero from '../CarouselHero/CarouselHero';
import useLangSelector from 'utils/useLangSelector';

type HomeHeroProps = {
  onSelectionChange: (val: string) => void;
};

const HomeHero: React.FC<HomeHeroProps> = ({onSelectionChange}) => {
  const lang = useLangSelector();
  const [selected, setSelected] = useState(1);

  console.log('test')
  const buttonList = [
    {
      id: 1,
      img: ic_rent_car,
      imgActive: ic_rent_car_active,
      title: lang.Home.daily.car_rental,
    },
    {
      id: 2,
      img: ic_rent_motorcycle,
      imgActive: ic_rent_motorcycle_active,
      title: 'Sewa Motor',
    },
    {
      id: 3,
      img: ic_rent_bicycle,
      imgActive: ic_rent_bicycle_active,
      title: 'Sewa Sepeda',
    },
  ];
  
  return (
    <View>
      <Image
        source={img_hero_background}
        style={styles.imgCar}
        resizeMode="cover"
      />
      <CarouselHero />

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
            onPress={() => {
              setSelected(button.id);
              onSelectionChange(button.title);
            }}
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
    height: WINDOW_HEIGHT / 3.5,
  },
  getRideLogo: {
    width: '25%',
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
  flatlist: {},
});
