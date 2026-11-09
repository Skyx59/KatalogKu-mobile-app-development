
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../theme/colors';

// Chip individual sesuai kontrak Modul 1
function CategoryChip({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        label.toLowerCase() === 'groceries' && styles.chipWide,
        selected && styles.chipSelected,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.textSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// Daftar chip horizontal sesuai Modul 4
export default function CategoryChips({
  items,
  selected,
  onSelect,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => (
        <CategoryChip
          key={item}
          label={item}
          selected={item === selected}
          onPress={() => onSelect(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    minWidth: 93,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipWide: {
    minWidth: 112,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  text: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  textSelected: {
    color: COLORS.background,
  },
});
