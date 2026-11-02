
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import Rating from './Rating';

export default function Card({
  title,
  price,
  image,
  category,
  onPress,
  discount,
  rating,
}) {
  const formattedPrice =
    typeof price === 'number'
      ? price.toLocaleString('id-ID')
      : price;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />

        {discount != null ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{discount}%
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        {category ? (
          <Text style={styles.category}>
            {category.toUpperCase()}
          </Text>
        ) : null}

        <Text style={styles.title} numberOfLines={2}>
        {title}
        </Text>

        {rating != null ? (
        <Rating value={rating} />
        ) : null}

        <Text style={styles.price}>
        Rp {formattedPrice}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.card,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  body: {
    padding: 10,
  },
  category: {
    fontSize: 10,
    color: COLORS.muted,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: COLORS.text,
    minHeight: 36,
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
});
