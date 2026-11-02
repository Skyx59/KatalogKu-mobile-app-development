
import { useState } from 'react';
import { ScrollView, View, Alert, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLORS } from './src/theme/colors';
import HeaderBar from './src/components/HeaderBar';
import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';

const FOTO = 'https://picsum.photos/300';

export default function App() {
  const [nama, setNama] = useState('');
  const [pencarian, setPencarian] = useState('');

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar style="dark" />

      <HeaderBar
        title="KatalogKu"
        subtitle="Uji coba komponen"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <CustomInput
          label="Nama"
          placeholder="Tulis nama..."
          value={nama}
          onChangeText={setNama}
          error={nama === '' ? 'Nama wajib diisi' : null}
        />

        <CustomInput
          label="Pencarian Produk"
          placeholder="Cari produk..."
          icon="search"
          value={pencarian}
          onChangeText={setPencarian}
        />

        <Button
          title="Sapa"
          onPress={() => Alert.alert('Halo', nama)}
        />

        <View style={styles.gap} />

        <Button
          title="Reset"
          variant="outline"
          onPress={() => setNama('')}
        />

        <View style={styles.gap} />

        <Button
          title="Hapus"
          variant="danger"
          onPress={() => Alert.alert('Hapus', 'Tombol danger berhasil diuji!')}
        />

        <View style={styles.row}>
          <Card
            title="Produk A"
            price={10}
            image={FOTO}
            discount={10}
            rating={4.6}
          />

          <Card
            title="Produk B"
            price={25}
            image={FOTO}
            rating={3.5}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  gap: {
    height: 12,
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: -6,
  },
});
