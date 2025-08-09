import { createSettingsStyles } from "@/assets/styles/settings.style";
import DangerZone from "@/components/DanzerZone";
import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyle.container}
    >
      <SafeAreaView style={settingsStyle.safeArea}>
        <View style={settingsStyle.header}>
          <View style={settingsStyle.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyle.iconContainer}
            >
              <Ionicons name="settings-outline" size={28} color="#fff" />
            </LinearGradient>
            <Text style={settingsStyle.title}>Settings</Text>
          </View>
        </View>
        <ScrollView
          style={settingsStyle.scrollView}
          contentContainerStyle={settingsStyle.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          {/* Preferences */}
          <Preferences />
          {/* Danger Zone */}

          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default settings;
