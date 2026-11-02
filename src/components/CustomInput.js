
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function CustomInput({
  label,
  error,
  icon,
  style,
  ...rest
}) {
  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        {icon ? (
          <View style={styles.iconContainer} pointerEvents="none">
            <Ionicons
              name={icon}
              size={20}
              color={COLORS.muted}
            />
          </View>
        ) : null}

        <TextInput
          {...rest}
          placeholderTextColor={COLORS.muted}
          style={[
            styles.input,
            icon ? styles.inputWithIcon : null,
            error ? styles.inputError : null,
            style,
          ]}
        />
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: COLORS.text,
  },
  inputContainer: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    fontSize: 15,
    color: COLORS.text,
  },
  inputWithIcon: {
    paddingLeft: 40,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  error: {
    marginTop: 4,
    color: COLORS.danger,
    fontSize: 12,
  },
});