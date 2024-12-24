import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const initialState = {
  currentValue: "0",
  previousValue: null,
  operator: null,
};

const performOperation = (previous, current, operator) => {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);

  switch (operator) {
    case "+":
      return prev + curr;
    case "-":
      return prev - curr;
    case "*":
      return prev * curr;
    case "/":
      return prev / curr;
    case "%":
      return prev % curr;
    default:
      return current;
  }
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return {
        ...state,
        currentValue: state.currentValue === "0" ? String(value) : state.currentValue + value,
      };
    case "operator":
      if (state.operator && state.previousValue !== null) {
        const result = performOperation(state.previousValue, state.currentValue, state.operator);
        return {
          ...state,
          previousValue: result,
          currentValue: String(result),
          operator: value,
        };
      } else {
        return {
          ...state,
          previousValue: state.currentValue,
          currentValue: '0',
          operator: value,
        };
      }
    case "clear":
      return initialState;
    case "posneg":
      return {
        ...state,
        currentValue: String(-parseFloat(state.currentValue)),
      };
    case "percentage":
      return {
        ...state,
        currentValue: String(parseFloat(state.currentValue) / 100),
      };
    case "equal":
      if (state.operator && state.previousValue !== null) {
        const result = performOperation(state.previousValue, state.currentValue, state.operator);
        return {
          ...state,
          currentValue: String(result),
          previousValue: null,
          operator: null,
        };
      }
      return state;
    case "doubleZero":
      return {
        ...state,
        currentValue: state.currentValue === "0" ? "00" : state.currentValue + "00",
      };
    case "decimal":
      if (!state.currentValue.includes(".")) {
        return {
          ...state,
          currentValue: state.currentValue + ".",
        };
      }
      return state;
    default:
      return state;
  }
};

const Button = ({ text, theme, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, theme === "accent" && styles.accent, theme === "primary" && styles.primary]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

export default class App extends Component {
  state = {
    ...initialState,
  };

  HandleTap = (type, value) => {
    this.setState((state) => calculator(type, value, state));
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
          <Row>
            <Button text="C" theme="secondary" onPress={() => this.HandleTap("clear")} />
            <Button text="+/-" theme="secondary" onPress={() => this.HandleTap("posneg")} />
            <Button text="%" theme="secondary" onPress={() => this.HandleTap("percentage")} />
            <Button text="/" theme="accent" onPress={() => this.HandleTap("operator", "/")} />
          </Row>
          <Row>
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" onPress={() => this.HandleTap("number", 9)} />
            <Button text="X" theme="accent" onPress={() => this.HandleTap("operator", "*")} />
          </Row>
          <Row>
            <Button text="4" onPress={() => this.HandleTap("number", 4)} />
            <Button text="5" onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" onPress={() => this.HandleTap("number", 6)} />
            <Button text="-" theme="accent" onPress={() => this.HandleTap("operator", "-")} />
          </Row>
          <Row>
            <Button text="1" onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" onPress={() => this.HandleTap("number", 3)} />
            <Button text="+" theme="accent" onPress={() => this.HandleTap("operator", "+")} />
          </Row>
          <Row>
            <Button text="0" onPress={() => this.HandleTap("number", 0)} />
            <Button text="00" onPress={() => this.HandleTap("doubleZero")} />
            <Button text="." onPress={() => this.HandleTap("decimal")} />
            <Button text="=" theme="primary" onPress={() => this.HandleTap("equal", "=")} />
          </Row>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Calc By Atharva Athanikar</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "flex-end",
  },
  value: {
    color: "#000",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    width: 75,
    height: 75,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
  },
  accent: {
    backgroundColor: "#2196F3",
  },
  primary: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
});
