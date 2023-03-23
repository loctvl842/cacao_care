import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {AIO_KEY, AIO_USERNAME} from '@env';

import uuid from 'react-native-uuid';

const factors = [
  {
    logo: require('../assets/temperature.png'),
    name: 'Temperature',
    unit: '°C',
    feedName: 'dht20-temp',
  },
  {
    logo: require('../assets/temperature.png'),
    name: 'Humidity',
    unit: '%',
    feedName: 'dht20-humi',
  },
  {
    logo: require('../assets/temperature.png'),
    name: 'Light',
    unit: '%',
    feedName: 'yolo-light',
  },
  {
    logo: require('../assets/temperature.png'),
    name: 'Moisture',
    unit: '%',
    feedName: 'yolo-moisture',
  },
];

const EnvironmentalFactor = ({factor}) => {
  // const AIO_KEY = 'aio_ZrDO10TgH4ZAUWLZI77wGSw4xfT8'; //take this in messenger
  // const AIO_USERNAME = 'tamquattnb123';
  const [value, setValue] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${factor.feedName}/data/last`,
          {
            headers: {
              'X-AIO-Key': AIO_KEY,
            },
          },
        );
        setValue(res.data.value);
      } catch (e) {
        alert(e);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '50%',
        marginTop: 11,
        marginBottom: 11,
      }}>
      <ImageBackground
        source={factor.logo}
        style={{width: 50, height: 50}}
        imageStyle={{
          width: '100%',
          height: '100%',
          borderRadius: 12,
        }}
      />
      <View style={{marginLeft: 14, justifyContent: 'space-evenly'}}>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 18,
            color: '#628093',
          }}>
          {factor.name}
        </Text>
        {value === null ? (
          <ActivityIndicator size="small" style={{alignItems: 'flex-start'}} />
        ) : (
          <Text
            style={{
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 21,
              color: '#333',
            }}>
            {value + ' ' + factor.unit}
          </Text>
        )}
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>CACAO CARE</Text>
      </View>
      <View style={styles.showcase}>
        <View style={styles.showcaseContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <ImageBackground
              style={styles.contentImgBackground}
              imageStyle={styles.contentImgBackground_img}
              source={require('../assets/cacao_news.jpg')}>
              <Text style={styles.contentImgBackground_text}>News</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <ImageBackground
              style={styles.contentImgBackground}
              imageStyle={styles.contentImgBackground_img}
              source={require('../assets/statistic.jpg')}>
              <Text style={styles.contentImgBackground_text}>Statistic</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.showcaseHeader}>
            <Text style={styles.headerTitle}>Information</Text>
            <Text style={styles.headerNavDetail}>View detail</Text>
          </View>
          <FlatList
            data={factors}
            renderItem={({item}) => <EnvironmentalFactor factor={item} />}
            keyExtractor={() => uuid.v4()}
            numColumns={2}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 31.25,
    color: '#333',
  },
  showcase: {
    marginTop: 28,
  },
  showcaseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentImgBackground: {
    width: 178,
    minHeight: 130,
    borderStyle: 'solid',
    borderColor: '#61AF2B',
    borderRadius: 12,
    borderWidth: 1,
    position: 'relative',
  },
  contentImgBackground_img: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  contentImgBackground_text: {
    fontWeight: 700,
    color: '#333',
    fontSize: 16,
    lineHeight: 21,
    position: 'absolute',
    left: 10,
    top: 5,
  },
  infoContainer: {
    marginTop: 24,
  },
  showcaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 23,
    color: '#333',
  },
  headerNavDetail: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 16,
    color: '#61AF2B',
    textDecorationLine: 'underline',
  },
});

export default Home;
