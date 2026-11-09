
import { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import Card from '../components/Card';
import { useFavorit } from '../context/FavoritContext';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { COLORS } from '../theme/colors';

export default function FavoritScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { favorit } = useFavorit();

  const numColumns =
    width >= 768 ? 4 : width >= 500 ? 3 : 2;

  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('Semua');

  const categories = [
    'Semua',
    ...new Set(DUMMY_PRODUCTS.map((p) => p.category)),
  ];

  const filteredProducts = favorit.filter((product) => {
    const sesuaiKategori =
      kategori === 'Semua' ||
      product.category === kategori;

    const sesuaiPencarian = product.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return sesuaiKategori && sesuaiPencarian;
  });

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Favorit"
        subtitle="Produk pilihan yang tersimpan di akunmu"
      />

      <View style={styles.search}>
        <View style={styles.searchField}>
          <CustomInput
            placeholder="Cari produk favorit"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />

          <Ionicons
            name="search"
            size={24}
            color={COLORS.muted}
            style={styles.searchIcon}
            pointerEvents="none"
          />
        </View>
      </View>

      <CategoryChips
        items={categories}
        selected={kategori}
        onSelect={setKategori}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Produk tersimpan
        </Text>

        <Text style={styles.productCount}>
          {filteredProducts.length} produk
        </Text>
      </View>

      <FlatList
        key={numColumns}
        data={filteredProducts}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        style={styles.grid}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>
            {favorit.length === 0
              ? 'Belum ada produk favorit'
              : 'Produk tidak ditemukan'}
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              width: `${100 / numColumns}%`,
            }}
          >
            <Card
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              category={item.category}
              onPress={() =>
                navigation.navigate('Detail', {
                  product: item,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  search: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  searchField: {
    position: 'relative',
  },

  searchInput: {
    borderRadius: 9,
    paddingLeft: 45,
  },

  searchIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
  },

  section: {
    height: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: COLORS.text,
  },

  productCount: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS.muted,
  },

  grid: {
    flex: 1,
  },

  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 24,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 40,
  },
});
