
import { View, Text, StyleSheet } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function TentangScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar
        title="Tentang"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Text style={styles.heading}>
          Tentang Aplikasi
        </Text>

        <Text style={styles.description}>
          KatalogKu adalah aplikasi katalog produk
          yang dikembangkan menggunakan React Native
          dan Expo.
        </Text>

        <Text style={styles.label}>
          Nama
        </Text>
        <Text style={styles.value}>
          Rezky Muhammad Hafiz Batubara
        </Text>

        <Text style={styles.label}>
          18224033
        </Text>
        <Text style={styles.value}>
          NIM Mahasiswa
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 16,
    gap: 8,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted,
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    color: COLORS.muted,
  },

  value: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 12,
  },
});
