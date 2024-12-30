import AuthModal from "@/components/auth/auth.modal";
import Slide from "@/components/onboarding/slide";
import Slider from "@/components/onboarding/slider";
import { onBoardingSlides } from "@/configs/constants";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";

export default function onboardingScreen() {
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const prev = onBoardingSlides[index - 1];
  const next = onBoardingSlides[index + 1];

  const handlePress = (index: number, setIndex: (index: number) => void) => {
    if (index === 2) {
      setModalVisible(true);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, position: "relative" }}>
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={
          prev && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={prev}
              totalSlides={onBoardingSlides.length}
              handlePress={handlePress}
            />
          )
        }
        next={
          next && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={next}
              totalSlides={onBoardingSlides.length}
              handlePress={handlePress}
            />
          )
        }
      >
        <Slide
          slide={onBoardingSlides[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={onBoardingSlides.length}
          handlePress={handlePress}
        />
      </Slider>

      <View style={styles.indicatorContainer}>
        {Array.from({ length: onBoardingSlides.length }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.indicator, i === index && styles.activeIndicator]}
          />
        ))}
      </View>

      {/* Next Button */}
      {index <= onBoardingSlides.length - 1 && (
        <LinearGradient
          colors={["#6D55FE", "#8976FC"]}
          style={styles.nextButton}
        >
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            onPress={() => handlePress(index, setIndex)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </LinearGradient>
      )}

      <View style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
            <AuthModal setModalVisible={setModalVisible} />
          </Pressable>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    marginTop: verticalScale(35),
    position: "absolute",
    bottom: verticalScale(55),
    left: scale(22),
  },
  indicator: {
    height: verticalScale(7),
    width: scale(18),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: scale(4),
    borderRadius: scale(4),
  },
  activeIndicator: {
    height: verticalScale(7),
    width: scale(35),
    backgroundColor: "white",
  },
  nextButton: {
    position: "absolute",
    zIndex: 999999999,
    right: windowWidth(25),
    bottom: windowHeight(50),
    marginTop: windowHeight(30),
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth(140),
    height: windowHeight(37),
    borderRadius: windowWidth(20),
  },
  nextButtonText: {
    color: "white",
    fontSize: fontSizes.FONT22,
    fontWeight: "bold",
  },
});
