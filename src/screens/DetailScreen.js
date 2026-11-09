
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import { useFavorit } from '../context/FavoritContext';
import { COLORS } from '../theme/colors';

export default function DetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { product } = route.params;

  const { isFavorit, toggleFavorit } = useFavorit();
  const fav = isFavorit(product.id);

  const formattedPrice = Number(
    product.price
  ).toLocaleString('id-ID');

  const formattedRating = Number(
    product.rating
  ).toFixed(1);

  return (
    <View style={styles.backdrop}>
      <StatusBar
        style="light"
        backgroundColor={COLORS.accent}
      />

      <View
        style={{
          height: Math.max(76, insets.top + 16),
        }}
      />

      <View style={styles.overlay}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <HeaderBar
            title={product.title}
            compact
            embedded
            onBack={() => navigation.goBack()}
          />

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.thumbnail }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.category}>
              {product.category.toUpperCase()}
            </Text>

            <Text style={styles.title}>
              {product.title}
            </Text>

            <Text style={styles.price}>
              Rp {formattedPrice}
            </Text>

            <Text style={styles.rating}>
              ★ {formattedRating} / 5
            </Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>
              Deskripsi produk
            </Text>

            <Text style={styles.descriptionBody}>
              {product.description}
            </Text>
          </View>

          <Button
            title={
              fav
                ? 'Hapus dari Favorit'
                : 'Tambah ke Favorit'
            }
            variant={fav ? 'outline' : 'primary'}
            height={48}
            onPress={() => toggleFavorit(product)}
          />
        </ScrollView>
      </View>

      <View style={styles.bottomBand} />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingHorizontal: 2,
    backgroundColor: COLORS.accent,
  },

  overlay: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: COLORS.background,
  },

  bottomBand: {
    height: 24,
    backgroundColor: COLORS.accent,
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },

  imageContainer: {
    width: '100%',
    aspectRatio: 324 / 250,
    borderRadius: 9,
    backgroundColor: COLORS.card,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  productInfo: {
    minHeight: 128,
    gap: 8,
  },

  category: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS.muted,
  },

  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  price: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  rating: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
    color: COLORS.text,
  },

  description: {
    minHeight: 92,
    gap: 8,
  },

  descriptionTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: COLORS.text,
  },

  descriptionBody: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
    color: COLORS.muted,
  },
});
