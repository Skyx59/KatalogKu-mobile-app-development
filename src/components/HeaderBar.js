import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function HeaderBar({
  title,
  subtitle,
  onBack,
  compact = false,
  embedded = false,
}) {
  const insets = useSafeAreaInsets();
  const isCompact = compact || Boolean(onBack && !subtitle);

  return (
    <View
      style={[
        styles.bar,
        embedded
          ? styles.embedded
          : { paddingTop: insets.top },
      ]}
    >
      <View
        style={[
          styles.inner,
          isCompact
            ? styles.innerCompact
            : styles.innerDefault,
        ]}
      >
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={10}
            style={styles.back}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={COLORS.text}
            />
          </Pressable>
        ) : null}

        <View
          style={[
            styles.content,
            !isCompact &&
              subtitle &&
              styles.contentWithSubtitle,
          ]}
        >
          <Text
            style={[
              styles.title,
              isCompact && styles.titleCompact,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text
              style={styles.subtitle}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  embedded: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },

  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  innerDefault: {
    height: 56,
  },

  innerCompact: {
    height: 44,
  },

  back: {
    width: 35,
    marginRight: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  contentWithSubtitle: {
    gap: 12,
  },

  title: {
    color: COLORS.text,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
  },

  titleCompact: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
  },
});
