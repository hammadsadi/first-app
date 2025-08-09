import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import Input from "@/components/Input";
import LoadingSpinner from "@/components/LoadingSpinner";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColorScheme, useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type Todo = Doc<"todo">;
export default function Index() {
  const todos = useQuery(api.todo.getTodos);
  const addTodo = useMutation(api.todo.addTodo);
  const clearTodo = useMutation(api.todo.clearTodos);
  const toggleTodo = useMutation(api.todo.toggleTodoStatus);
  const deleteTodo = useMutation(api.todo.deleteTodo);
  const { colors, toggleDarkMode } = useTheme();
  const homeStyle = createHomeStyles(colors);
  const isLoading = todos === undefined;

  // Update Todo Status
  const handleToggleTodo = async (id: Id<"todo">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete Todo
  const handleDeleteTodo = async (id: Id<"todo">) => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.log(error);
    }
  };
  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyle.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyle.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyle.checkbox}
            activeOpacity={0.9}
            onPress={() => handleToggleTodo(item?._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyle.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item?.isCompleted && (
                <Ionicons name="checkmark" size={16} color={"#fff"} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyle.todoTextContainer}>
            <Text
              style={[
                homeStyle.todoText,
                item?.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.8,
                },
              ]}
            >
              {item?.text}
            </Text>

            <View style={homeStyle.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="pencil" size={20} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item?._id)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="trash" size={20} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyle.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <Header />
      <Input />
      <SafeAreaView style={homeStyle.safeArea}>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyle.todoList}
          contentContainerStyle={homeStyle.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const createStyle = (color: ColorScheme) => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color.bg,
    },
    content: {
      fontSize: 22,
    },
  });
  return style;
};
