
import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

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

  const hasRating = rating != null;

  return (
    <Pressable
      style={[
        styles.card,
        !hasRating && styles.cardDefault,
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
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
          <Text
            style={styles.category}
            numberOfLines={1}
          >
            {category.toUpperCase()}
          </Text>
        ) : null}

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>

        {hasRating ? (
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
    minHeight: 193,
    margin: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },

  cardDefault: {
    height: 158/193,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 158 / 108,
    backgroundColor: COLORS.card,
    overflow: 'hidden',
    flexShrink: 0,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  body: {
    marginTop: 4,
    paddingTop: 0,
    paddingRight: 4,
    paddingBottom: 0,
    paddingLeft: 8,
  },

  category: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS.muted,
    marginBottom: 4,
  },

  title: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS.text,
  },

  price: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS.primary,
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
    textAlign: 'center',
  },
});
