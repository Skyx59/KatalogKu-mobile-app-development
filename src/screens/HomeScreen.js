
import { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import Card from '../components/Card';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { COLORS } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();

  const numColumns =
    width >= 768 ? 4 : width >= 500 ? 3 : 2;

  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('Semua');
  const [urutan, setUrutan] = useState(null);

  const categories = [
    'Semua',
    ...new Set(DUMMY_PRODUCTS.map((p) => p.category)),
  ];

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const sesuaiKategori =
      kategori === 'Semua' ||
      product.category === kategori;

    const sesuaiPencarian = product.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return sesuaiKategori && sesuaiPencarian;
  });

  const data = [...filteredProducts];

  if (urutan === 'termurah') {
    data.sort((a, b) => a.price - b.price);
  } else if (urutan === 'termahal') {
    data.sort((a, b) => b.price - a.price);
  }

  const pilihUrutan = (nilai) => {
    setUrutan((sebelumnya) =>
      sebelumnya === nilai ? null : nilai
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="KatalogKu"
        subtitle="Temukan produk yang sesuai kebutuhanmu"
      />

      <View style={styles.search}>
        <View style={styles.searchField}>
          <CustomInput
            placeholder="Cari produk berdasarkan nama"
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
          Jelajahi produk
        </Text>

        <Text style={styles.productCount}>
          {data.length} produk
        </Text>
      </View>

      <FlatList
        key={numColumns}
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        style={styles.grid}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <View style={styles.banner}>
              <Image
                source={{
                  uri: DUMMY_PRODUCTS[0].thumbnail,
                }}
                style={styles.bannerImage}
                resizeMode="cover"
              />

              <View style={styles.bannerOverlay} />

              <Text style={styles.bannerText}>
                Diskon 50%
              </Text>
            </View>

            <View style={styles.sortRow}>
              {['termurah', 'termahal'].map((nilai) => (
                <Pressable
                  key={nilai}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: urutan === nilai,
                  }}
                  onPress={() => pilihUrutan(nilai)}
                  style={[
                    styles.sortChip,
                    urutan === nilai &&
                      styles.sortChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.sortText,
                      urutan === nilai &&
                        styles.sortTextSelected,
                    ]}
                  >
                    {nilai === 'termurah'
                      ? 'Termurah'
                      : 'Termahal'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Produk tidak ditemukan
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

  banner: {
    height: 110,
    marginHorizontal: 6,
    marginBottom: 12,
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: COLORS.accent,
  },

  bannerImage: {
    width: '100%',
    height: '100%',
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.accent,
    opacity: 0.7,
  },

  bannerText: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.background,
  },

  sortRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 6,
    marginBottom: 12,
  },

  sortChip: {
    minWidth: 93,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sortChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  sortText: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
  },

  sortTextSelected: {
    color: COLORS.background,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 40,
  },
});
