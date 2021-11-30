import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
const { height } = Dimensions.get('screen');

const SplashScreen = () => {
  const pigAnimation = useRef(
    new Animated.ValueXY({ x: height, y: height / 2 }),
  ).current;
  const coinAnimation = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pigAnimation, {
        duration: 600,
        toValue: { x: 0, y: height / 2 },
        useNativeDriver: true,
      }),
      Animated.timing(coinAnimation, {
        toValue: height / 2 + 50,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(pigAnimation, {
          toValue: { x: 0, y: -height },
          useNativeDriver: true,
        }),
        Animated.spring(coinAnimation, {
          toValue: -height,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        source={{
          uri: 'https://www.pngall.com/wp-content/uploads/4/Empty-Gold-Coin-Transparent.png',
        }}
        style={{
          width: 50,
          height: 50,
          transform: [{ translateY: coinAnimation }],
          position: 'absolute',
          top: 0,
        }}
      />
      <Animated.Image
        resizeMode="contain"
        source={{
          uri: 'https://cdn1.iconfinder.com/data/icons/volume-6-1/64/7-512.png',
        }}
        style={{
          width: 200,
          height: 200,
          transform: pigAnimation.getTranslateTransform(),
          position: 'absolute',
          top: 0,
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
