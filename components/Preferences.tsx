import { createSettingsStyles } from "@/assets/styles/settings.style";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const [autoSync, setAutoSync] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>Preferences</Text>
      {/* Dark Mode */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="moon" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      {/* Notification */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="notifications" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.settingText}>Notifications</Text>
        </View>
        <Switch
          value={notificationEnabled}
          onValueChange={() => setNotificationEnabled(!notificationEnabled)}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.warning }}
        />
      </View>
      {/* Auto Sync */}
      <View style={settingsStyle.settingItem}>
        <View style={settingsStyle.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingsStyle.settingIcon}
          >
            <Ionicons name="notifications" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={autoSync}
          onValueChange={() => setAutoSync(!autoSync)}
          thumbColor="#fff"
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
