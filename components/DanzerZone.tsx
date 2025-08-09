import { createSettingsStyles } from "@/assets/styles/settings.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  const clearTodos = useMutation(api.todo.clearTodos);
  const handleClearAll = () => {
    Alert.alert("Clear All", "Are you sure you want to clear all todos?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete All",
        style: "destructive",
        onPress: async () => {
          try {
            await clearTodos();
            Alert.alert("Cleared", "All todos have been cleared");
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitleDanger}>Danger Zone</Text>
      <TouchableOpacity
        style={[settingsStyle.actionButton, { borderWidth: 0 }]}
        activeOpacity={0.9}
        onPress={handleClearAll}
      >
        <View style={settingsStyle.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyle.actionIcon}
          >
            <Ionicons name="trash" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyle.actionText}>Clear All</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
