import React, { useRef, useState, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

function Joystick({ padRadius = 64, thumbRadius = 30, handleChange }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const center = {
    x: padRadius - thumbRadius - 3,
    y: padRadius - thumbRadius - 3,
  };

  useEffect(() => {
    handleChange({
      x: pos.x / (padRadius - thumbRadius / 2),
      y: -pos.y / (padRadius - thumbRadius / 2),
    });
  }, [pos]);

  const pan = useRef(new Animated.ValueXY(center)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetResponder: () => true,
      onPanResponderGrant: () => {
        pan.flattenOffset();
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        let angle = Math.atan2(
          gestureState.moveY - gestureState.y0,
          gestureState.moveX - gestureState.x0
        );
        let distance = Math.min(
          padRadius - thumbRadius / 2,
          Math.sqrt(
            Math.pow(gestureState.moveX - gestureState.x0, 2) +
              Math.pow(gestureState.moveY - gestureState.y0, 2)
          )
        );
        setPos({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });

        return Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: () => {
        setPos({ x: 0, y: 0 });
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  return (
    <View
      style={[
        styles.container,
        {
          width: padRadius * 2,
          borderRadius: padRadius,
        },
      ]}
    >
      <View
        style={[
          {
            top: pos.y + padRadius - thumbRadius - 3,
            left: pos.x + padRadius - thumbRadius - 3,
            width: thumbRadius * 2,
            borderRadius: thumbRadius,
            color: "black",
          },
          styles.thumb,
        ]}
      />
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: "rgba(0,0,0,0.5)",
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
            width: thumbRadius * 2,
            borderRadius: thumbRadius,
          },
        ]}
        {...panResponder.panHandlers}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,

    position: "absolute",
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  thumb: {
    position: "absolute",
    backgroundColor: "white",
    aspectRatio: 1,
  },
});

export default Joystick;
