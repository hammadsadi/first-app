import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const Input = () => {
  const { colors } = useTheme();
  const addTodo = useMutation(api.todo.addTodo);
  const [addTodoText, setAddTodoText] = useState("");

  const homeStyle = createHomeStyles(colors);
  const handleTodo = async () => {
    try {
      if (addTodoText.trim()) {
        await addTodo({ text: addTodoText });
        setAddTodoText("");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add todo");
    }
  };
  return (
    <View style={homeStyle.inputSection}>
      <View style={homeStyle.inputWrapper}>
        <TextInput
          style={homeStyle.input}
          placeholder="Add a task..."
          value={addTodoText}
          onChangeText={setAddTodoText}
          onSubmitEditing={handleTodo}
          multiline
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleTodo}
          style={homeStyle.addButton}
          disabled={!addTodoText.trim()}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={
              addTodoText.trim()
                ? colors.gradients.primary
                : colors.gradients.muted
            }
            style={[
              homeStyle.addButton,
              !addTodoText.trim() && homeStyle.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Input;
