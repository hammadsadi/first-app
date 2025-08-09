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
import { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
  const updateTodo = useMutation(api.todo.updateTodoText);
  const { colors, toggleDarkMode } = useTheme();
  const homeStyle = createHomeStyles(colors);
  const [editingId, setEditingId] = useState<Id<"todo"> | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const isLoading = todos === undefined;

  // Handle Edit
  const handleEdit = (todo: Todo) => {
    setEditedText(todo.text);
    setEditingId(todo._id);
  };

  // Update Todo
  const handleSaveEdit = async (todo: Todo) => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editedText.trim() });

        setEditingId(null);
        setEditedText("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };
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
      Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTodo({ id });
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
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
          {isEditing ? (
            <View style={homeStyle.editContainer}>
              <TextInput
                style={homeStyle.editInput}
                value={editedText}
                onChangeText={setEditedText}
                onSubmitEditing={() => handleSaveEdit(item)}
                autoFocus
                placeholder="Enter todo text"
                placeholderTextColor={colors.textMuted}
                multiline
              />
              <View style={homeStyle.editButtons}>
                <TouchableOpacity
                  onPress={() => handleSaveEdit(item)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyle.editButton}
                  >
                    <Ionicons name="checkmark" size={20} color={"#fff"} />
                    <Text style={homeStyle.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyle.editButton}
                  >
                    <Ionicons name="close" size={20} color={"#fff"} />
                    <Text style={homeStyle.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  activeOpacity={0.9}
                >
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
          )}
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
