import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function OTPScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#2d2f2e" />
        </TouchableOpacity>
        <Text style={styles.navBrand}>SnapCart</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Enter the code</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit verification code to <Text style={styles.highlightText}>+91 (•••) •••-4298</Text>
          </Text>
        </View>

        {/* OTP Input Group */}
        <View style={styles.otpContainer}>
          {[1, 2, 3, 4, 5, 6].map((key, index) => (
            <TextInput
              key={key}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              placeholder="·"
              placeholderTextColor="#acadac"
              defaultValue={index === 0 ? "4" : ""}
              textAlign="center"
            />
          ))}
        </View>

        {/* Resend Timer */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendPrompt}>Didn't receive a code?</Text>
          <View style={styles.resendActions}>
            <Text style={styles.timerText}>Resend in 0:45</Text>
            <View style={styles.dot} />
            <TouchableOpacity disabled={true}>
              <Text style={styles.resendDisabledText}>Resend now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={() => router.push("/")}>
          <Text style={styles.primaryButtonText}>Verify code</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          By continuing, you agree to SnapCart's Terms of Service and Privacy Policy. Standard SMS rates may apply.
        </Text>
      </View>

      {/* Visual Embellishment */}
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f4",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 64,
    backgroundColor: "#f6f6f4",
    zIndex: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  navBrand: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2d2f2e",
  },
  spacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    flexGrow: 1,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#2d2f2e",
    marginBottom: 16,
    lineHeight: 52,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#5a5c5b",
    lineHeight: 24,
  },
  highlightText: {
    color: "#2d2f2e",
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 32,
  },
  otpInput: {
    flex: 1,
    height: 70,
    backgroundColor: "#f0f1ef",
    borderRadius: 16,
    fontSize: 28,
    fontWeight: "600",
    color: "#2d2f2e",
  },
  resendContainer: {
    alignItems: "center",
    gap: 4,
  },
  resendPrompt: {
    fontSize: 14,
    color: "#5a5c5b",
    fontWeight: "500",
  },
  resendActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a63300",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#acadac",
  },
  resendDisabledText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#767776",
  },
  footerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 24,
  },
  primaryButton: {
    backgroundColor: "#a63300",
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#a63300",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#ffefeb",
    fontSize: 18,
    fontWeight: "700",
  },
  footerNote: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
    color: "rgba(90, 92, 91, 0.7)",
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  accentTop: {
    position: "absolute",
    top: width * 0.3,
    right: -100,
    width: 250,
    height: 250,
    backgroundColor: "rgba(166, 51, 0, 0.05)",
    borderRadius: 250,
    zIndex: -1,
  },
  accentBottom: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 320,
    height: 320,
    backgroundColor: "rgba(160, 56, 52, 0.05)",
    borderRadius: 320,
    zIndex: -1,
  },
});
