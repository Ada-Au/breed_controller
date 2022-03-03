import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Joystick from "./components/joystick";

export default function App() {
  const [pos1, setPos1] = useState({ x: 0, y: 0 });
  const [pos2, setPos2] = useState({ x: 0, y: 0 });

  const handleChange1 = (pos) => {
    setPos1(pos);
  };
  const handleChange2 = (pos) => {
    setPos2(pos);
  };
  return (
    <View style={styles.container}>
      <View style={styles.joystick1}>
        <Joystick padRadius={90} handleChange={handleChange1} />
      </View>
      <View style={styles.joystick2}>
        <Joystick
          padRadius={40}
          thumbRadius={20}
          handleChange={handleChange2}
        />
      </View>
      <View style={styles.data}>
        <Text>
          Joystick1.x:{pos1.x.toPrecision(4)} Joystick1.y:
          {pos1.y.toPrecision(4)}
        </Text>
        <Text>
          Joystick2.x:{pos2.x.toPrecision(4)} Joystick2.y:
          {pos2.y.toPrecision(4)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  joystick1: {
    flex: 0.3,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  joystick2: {
    flex: 0.3,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  data: {
    alignItems: "center",
    justifyContent: "center",
  },
});
