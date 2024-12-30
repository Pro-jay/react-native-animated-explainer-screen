import { HEIGHT, WIDTH } from "@/configs/constants";
import { fontSizes, SCREEN_WIDTH } from "@/themes/app.constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

export default function Slide({
  slide,
  index,
  setIndex,
  totalSlides,
  handlePress,
}: {
  slide: onBoardingSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
  handlePress: (index: number, setIndex: (index: number) => void) => void;
}) {
  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={slide.color} />
            <Stop offset="100%" stopColor={slide.color} />
          </RadialGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill={"url(#gradient)"}
        />
      </Svg>

      <View style={styles.container}>
        <View>{slide.image}</View>
        <View>
          <View
            style={{
              width: SCREEN_WIDTH * 1,
              paddingHorizontal: verticalScale(25),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: "600",
                color: "#05030D",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {slide.title}
            </Text>
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: "600",
                color: "#05030D",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {slide.secondTitle}
            </Text>
            <Text
              style={{
                paddingVertical: verticalScale(4),
                fontSize: fontSizes.FONT18,
                color: "#3E3B54",
                fontFamily: "Poppins_300Light",
              }}
            >
              {slide.subTitle}
            </Text>
          </View>
        </View>
      </View>

      {index < totalSlides - 1 && (
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handlePress(index, setIndex)}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={scale(18)}
            color="black"
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(60),
    paddingTop: verticalScale(100),
    alignItems: "center",
  },
  arrowButton: {
    position: "absolute",
    width: scale(30),
    height: scale(30),
    borderRadius: scale(20),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    right: moderateScale(5),
    top: Platform.OS === "ios" ? verticalScale(345) : verticalScale(385),
    transform: [{ translateY: -30 }],
  },
});
