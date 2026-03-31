import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Delivered in",
    titleHighlight: "minutes",
    description: "Experience the fastest local delivery service at your doorstep.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnJ-3kzZNdsft4YvcaIQ0ha631hjuCxlhoYK-r1sfplBeBXYmWKQpXWxWZVNxNOeQwipZ1L1Lyx259hoWfEyBpWtUlSwsitmB_u-A1m3MlTIDb7kl03LNERMyA96Uj0eDnbrXxS2bAwfz_S28jn4mKj7Riqs3xHZ3-rIkJqvyxMkj3kp2A5KbPOOXsHLAx7cyCm0Jd1lJENcFmla0pylswFSKu9ha-KIZYnJwVFRWMtwkGfCf7Pbc1cqWX2W37FTtpzSYE-i78rU8",
  },
  {
    id: "2",
    title: "Track every",
    titleHighlight: "step live",
    description: "Real-time GPS tracking keeps you updated from store to door.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_mgFp1xK0Q7kd3vYriaTp43cnOtbGeyLKbpOpMmNCWiz6xgR-MG6pVw9FYH59LS2RI68RtWLovpwbvBHSNNTSQQ0UuCAoMKQ6wNTQhs21jlIKP9gqji3XwFO59on4k5VZLTmMH8_yCWGUqqkDnLfqWnmOaIliAKLjTJX39Yxiqu3CpzS3grpEmsVFBny6zT7IAPCGRTMgKPciM1eFSEr4UvGdE00MAHnkV9xCYTMNEnMlXcs2rpNdh2TfitY59KfeRg2hzXPSCA",
  },
  {
    id: "3",
    title: "Rate your",
    titleHighlight: "experience",
    description: "Help us improve by sharing your feedback on every order.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqmCWeaIvqDgY-L1bQ_cGLO7BiHzOqNESKxcYguZLViMiwLVk2LgdQRWBxzv0I-06lo4DBQUp8_G4H0cCb515LfIaRDd68gPD8UmXsbcivnXKdN_xrUmxavjJMIqW2SXL97vhUM_7j8mCO9tz-_o7-b5rt0uQfUvzpZsr-Ibp7so0GB-wQtKSjGGoqighP_w14C-9geHpvi5l28m4NbovRISsBya2KejdWrbuyH-ipk2KIpe_hqP-KcxGQqI_Q9qLBvm7ARmzIPpQ",
  },
];

export default function SplashScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const skipToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>SnapCart</Text>
        <TouchableOpacity onPress={skipToLogin}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {onboardingData.map((item, index) => {
          return (
            <View style={styles.slide} key={item.id}>
              {/* Image Circle Accents */}
              <View style={styles.imageContainer}>
                <View style={[styles.glowBackground, { backgroundColor: index === 1 ? 'rgba(133, 61, 151, 0.2)' : 'rgba(166, 51, 0, 0.2)' }]} />
                <View style={styles.imageBorder}>
                  <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {item.title}{"\n"}
                  <Text style={styles.highlightText}>{item.titleHighlight}</Text>
                </Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Fixed Bottom Controls */}
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const dotWidth = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [6, 32, 6],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  { opacity, width: dotWidth },
                  i === currentIndex && styles.activeDot,
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => {
            if (currentIndex < onboardingData.length - 1) {
              scrollViewRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
            } else {
              skipToLogin();
            }
          }}
        >
          <Text style={styles.primaryButtonText}>
            {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      
      {/* Decorative Glow Elements */}
      <View style={styles.accentBottomLeft} />
      <View style={styles.accentTopRight} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f0e",
  },
  header: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 100,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ff7949",
    letterSpacing: -0.5,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#acadac",
    letterSpacing: 1.5,
  },
  scrollContent: {
    alignItems: "center",
  },
  slide: {
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  imageContainer: {
    width: width * 0.8,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    marginTop: -40,
  },
  glowBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  imageBorder: {
    width: "80%",
    height: "80%",
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 130,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    fontSize: 44,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 52,
    marginBottom: 16,
  },
  highlightText: {
    color: "#ff7949",
  },
  descriptionText: {
    fontSize: 18,
    color: "#dbdddb",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 26,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 32,
    paddingBottom: 48,
    paddingTop: 24,
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    height: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#acadac",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#a63300",
    shadowColor: "#a63300",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  primaryButton: {
    width: "100%",
    height: 64,
    backgroundColor: "#a63300",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  arrowIcon: {
    marginLeft: 12,
  },
  accentBottomLeft: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 400,
    height: 400,
    backgroundColor: "rgba(166, 51, 0, 0.05)",
    borderRadius: 400,
    zIndex: -1,
  },
  accentTopRight: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    backgroundColor: "rgba(255, 121, 73, 0.05)",
    borderRadius: 400,
    zIndex: -1,
  },
});
