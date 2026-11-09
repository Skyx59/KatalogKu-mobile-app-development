
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function ProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar title="Profil" />

      <Text style={styles.message}>
        Segera hadir di Modul 6
      </Text>

      <Pressable
        style={styles.menuItem}
        onPress={() => navigation.navigate('Tentang')}
      >
        <Ionicons
          name="information-circle-outline"
          size={22}
          color={COLORS.text}
        />

        <Text style={styles.menuText}>
          Tentang Aplikasi
        </Text>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.muted}
        />
      </Pressable>
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

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },

  menuText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
});
