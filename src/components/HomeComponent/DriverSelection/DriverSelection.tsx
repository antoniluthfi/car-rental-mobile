import useLangSelector from 'utils/useLangSelector';
import {h1} from 'utils/styles';
import {ic_with_driver, ic_without_driver_active} from 'assets/icons';
import {iconSize, rowCenter} from 'utils/mixins';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from 'utils';
import {useState} from 'react';

type Props = {
  onChange: (val: number) => void;
};

const DriverSelection: React.FC<Props> = ({onChange}) => {
  const lang = useLangSelector();
  const [selected, setSelected] = useState(1);

  const buttonList = [
    {
      id: 1,
      img: ic_without_driver_active,
      imgActive: ic_without_driver_active,
      name: lang.Home.daily.without_driver,
      disabled: false,
    },
    {
      id: 2,
      img: ic_with_driver,
      imgActive: ic_with_driver,
      name: lang.Home.daily.with_driver,
      disabled: true,
    },
  ];

  return (
    <View style={styles.container}>
      {buttonList.map((button, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.button,
            {
              backgroundColor:
                selected === button.id ? theme.colors.navy : theme.colors.white,
              ...(selected === 1
                ? styles.buttonBorderLeft
                : styles.buttonBorderRight),
            },
          ]}
          onPress={() => {
            setSelected(button.id);
            onChange(button.id);
          }}
          disabled={button.disabled}>
          <View style={rowCenter}>
            <Image
              source={selected === button.id ? button.imgActive : button.img}
              style={iconSize}
            />
            <Text
              style={[
                h1,
                {
                  marginLeft: 10,
                  color:
                    selected === button.id
                      ? theme.colors.white
                      : theme.colors.grey4,
                },
              ]}>
              {button.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DriverSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    flexBasis: '50%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonBorderLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonBorderRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});