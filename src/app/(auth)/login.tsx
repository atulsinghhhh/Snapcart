import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Brand Identity Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="shopping-cart" size={40} color="#ffefeb" />
          </View>
          <Text style={styles.brandTitle}>SnapCart</Text>
          <Text style={styles.brandSubtitle}>Fresh essentials delivered in a snap.</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.countryCodeSelector}>
                <Text style={styles.countryCodeText}>+91</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="#2d2f2e" />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="#acadac"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.otpToggle}>
            <TouchableOpacity onPress={() => router.push("/(auth)/otp")}>
              <Text style={styles.otpToggleText}>Login with OTP instead</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={() => router.push("/")}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <MaterialIcons name="g-translate" size={24} color="#4285F4" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New here? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.footerLink}>Create account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Visual Accents */}
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#a63300",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#a63300",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#2d2f2e",
    marginBottom: 8,
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: 16,
    color: "#5a5c5b",
    fontWeight: "500",
    textAlign: "center",
  },
  formSection: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5a5c5b",
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f1ef",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  countryCodeSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#e1e3e1",
    gap: 4,
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2d2f2e",
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#2d2f2e",
    fontWeight: "500",
  },
  otpToggle: {
    alignItems: "flex-end",
    paddingRight: 8,
    marginTop: -8,
  },
  otpToggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a63300",
    textDecorationLine: "underline",
  },
  primaryButton: {
    backgroundColor: "#a63300",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#a63300",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#ffefeb",
    fontSize: 18,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#acadac",
    opacity: 0.3,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 10,
    fontWeight: "700",
    color: "#767776",
    letterSpacing: 1,
  },
  socialButton: {
    backgroundColor: "#ffffff",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d2f2e",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 48,
  },
  footerText: {
    fontSize: 15,
    color: "#5a5c5b",
    fontWeight: "500",
  },
  footerLink: {
    fontSize: 15,
    color: "#a63300",
    fontWeight: "700",
  },
  accentTop: {
    position: "absolute",
    top: -50,
    right: -50,
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: "rgba(166, 51, 0, 0.08)",
    borderRadius: width,
    zIndex: -1,
  },
  accentBottom: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: "rgba(160, 56, 52, 0.05)",
    borderRadius: width,
    zIndex: -1,
  },
});
