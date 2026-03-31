import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SnapCart and get groceries in minutes</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FULL NAME</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color="#5a5c5b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#acadac"
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail" size={20} color="#5a5c5b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor="#acadac"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PHONE NUMBER</Text>
            <View style={styles.phoneWrapper}>
              <View style={styles.countryCodeSelector}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <View style={styles.phoneInputWrapper}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="00000 00000"
                  placeholderTextColor="#acadac"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#5a5c5b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#acadac"
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <MaterialIcons name="visibility" size={20} color="#5a5c5b" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity style={styles.checkbox}>
              {/* Optional: Add icon later for checked state */}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8} 
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Visual Accents */}
      <View style={styles.accentTopRight} />
      <View style={styles.accentBottomLeft} />
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#2d2f2e",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#5a5c5b",
    fontWeight: "500",
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
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f1ef",
    borderRadius: 16,
    height: 56,
  },
  inputIcon: {
    paddingLeft: 16,
    paddingRight: 12,
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#2d2f2e",
    fontWeight: "500",
  },
  phoneWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  countryCodeSelector: {
    backgroundColor: "#f0f1ef",
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2d2f2e",
  },
  phoneInputWrapper: {
    flex: 1,
    backgroundColor: "#f0f1ef",
    borderRadius: 16,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#2d2f2e",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#acadac",
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#5a5c5b",
    lineHeight: 20,
  },
  termsLink: {
    color: "#a63300",
    fontWeight: "600",
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
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#ffefeb",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 48,
  },
  footerText: {
    fontSize: 14,
    color: "#5a5c5b",
    fontWeight: "500",
  },
  footerLink: {
    fontSize: 14,
    color: "#a63300",
    fontWeight: "700",
  },
  accentTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 250,
    height: 250,
    backgroundColor: "rgba(166, 51, 0, 0.05)",
    borderRadius: 250,
    transform: [{ translateX: 125 }, { translateY: -125 }],
    zIndex: -1,
  },
  accentBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 350,
    height: 350,
    backgroundColor: "rgba(166, 51, 0, 0.08)",
    borderRadius: 350,
    transform: [{ translateX: -175 }, { translateY: 175 }],
    zIndex: -1,
  },
});