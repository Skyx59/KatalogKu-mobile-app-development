
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function Rating({ value = 0 }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (roundedRating >= index + 1) {
      return 'star';
    }

    if (roundedRating >= index + 0.5) {
      return 'star-half';
    }

    return 'star-outline';
  });

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Rating ${rating.toFixed(1)} dari 5`}
    >
      {stars.map((icon, index) => (
        <Ionicons
          key={index}
          name={icon}
          size={14}
          color={COLORS.accent}
        />
      ))}

      <Text style={styles.value}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 4,
  },
  value: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
});
