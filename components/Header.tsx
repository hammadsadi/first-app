import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const Header = () => {
  const todos = useQuery(api.todo.getTodos);
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);
  const completedTodos = todos
    ? todos?.filter((todo) => todo?.isCompleted).length
    : 0;
  const totalCount = todos ? todos?.length : 0;
  const totalPercentage =
    totalCount > 0 ? Math.round((completedTodos / totalCount) * 100) : 0;
  return (
    <View style={homeStyle.header}>
      <View style={homeStyle.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyle.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#fff" />
        </LinearGradient>
        <View style={homeStyle.titleTextContainer}>
          <Text style={homeStyle.title}>Today Tasks</Text>
          <Text style={homeStyle.subtitle}>
            {completedTodos} of {totalCount} completed
          </Text>
        </View>
      </View>
      {totalPercentage && (
        <View style={homeStyle.progressContainer}>
          <View style={homeStyle.progressBarContainer}>
            <View style={homeStyle.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[
                  homeStyle.progressFill,
                  { width: `${totalPercentage}%` },
                ]}
              />
            </View>
            <Text style={homeStyle.progressText}>{totalPercentage}%</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
