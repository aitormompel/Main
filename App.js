import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = [
  "Groceries",
  "Dining",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
];

const initialExpenses = [
  { id: "1", title: "Coffee with team", category: "Dining", amount: 12.5 },
  { id: "2", title: "Weekly groceries", category: "Groceries", amount: 64.2 },
  { id: "3", title: "Metro pass", category: "Transport", amount: 40 },
];

export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);

  const total = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses]
  );

  const handleAddExpense = () => {
    const parsedAmount = Number.parseFloat(amount);
    if (!title.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const nextExpense = {
      id: `${Date.now()}`,
      title: title.trim(),
      category: CATEGORIES[categoryIndex],
      amount: parsedAmount,
    };

    setExpenses((current) => [nextExpense, ...current]);
    setTitle("");
    setAmount("");
    setCategoryIndex(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Expense Tracker</Text>
        <Text style={styles.subtitle}>Track daily spending on the go.</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total this month</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionLabel}>New expense</Text>
        <TextInput
          placeholder="Expense name"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          style={styles.input}
        />
        <View style={styles.categoryRow}>
          {CATEGORIES.map((category, index) => {
            const isActive = index === categoryIndex;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setCategoryIndex(index)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isActive && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Add expense</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionLabel}>Recent expenses</Text>
        <Text style={styles.countLabel}>{expenses.length} items</Text>
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.listCategory}>{item.category}</Text>
            </View>
            <Text style={styles.listAmount}>${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fb",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1d1e2c",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: "#5c5f7b",
  },
  totalCard: {
    margin: 24,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#3f5efb",
  },
  totalLabel: {
    color: "#d7defa",
    fontSize: 14,
  },
  totalValue: {
    marginTop: 6,
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
  },
  form: {
    backgroundColor: "#ffffff",
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#1d1e2c",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1e2c",
  },
  input: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#f2f3f7",
    fontSize: 15,
    color: "#1d1e2c",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e2e5f2",
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipActive: {
    backgroundColor: "#1d1e2c",
    borderColor: "#1d1e2c",
  },
  categoryChipText: {
    fontSize: 12,
    color: "#5c5f7b",
  },
  categoryChipTextActive: {
    color: "#ffffff",
  },
  addButton: {
    marginTop: 12,
    backgroundColor: "#3f5efb",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  listHeader: {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countLabel: {
    color: "#9aa0b4",
    fontSize: 13,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  listItem: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1d1e2c",
  },
  listCategory: {
    marginTop: 4,
    fontSize: 12,
    color: "#9aa0b4",
  },
  listAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1d1e2c",
  },
});
