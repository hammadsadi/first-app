import { createSettingsStyles } from "@/assets/styles/settings.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  const todos = useQuery(api.todo.getTodos);
  const totalTodos = todos ? todos?.length : 0;
  const completedTodos = todos
    ? todos?.filter((todo) => todo?.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>Progress Stats</Text>

      <View style={settingsStyle.statsContainer}>
        {/* Total Todo */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyle.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingsStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyle.statIcon}
            >
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyle.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyle.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>
        {/* Completed */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyle.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingsStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingsStyle.statIcon}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyle.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyle.statLabel}>Completed</Text>
          </View>
        </LinearGradient>
        {/* Active Todos */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyle.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingsStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingsStyle.statIcon}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyle.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyle.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
