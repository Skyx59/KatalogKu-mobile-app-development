
import { View, Text, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <HeaderBar title="Keranjang" />

      <Text style={styles.message}>
        Keranjang masih kosong
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  message: {
    padding: 16,
    fontSize: 14,
    color: COLORS.muted,
  },
});
    