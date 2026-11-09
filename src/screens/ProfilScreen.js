
import { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { validateProfil } from '../utils/validators';
import { COLORS } from '../theme/colors';

const AWAL = {
  nama: '',
  email: '',
  hp: '',
  password: '',
  ulangiPassword: '',
};

export default function ProfilScreen({ navigation }) {
  const [profilTersimpan, setProfilTersimpan] = useState(null);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
  } = useForm(AWAL, validateProfil);

  const adaFieldKosong = Object.values(values).some(
    (value) => !value.trim()
  );

  const simpan = (data) => {
    setProfilTersimpan({
      nama: data.nama,
      email: data.email,
    });

    Alert.alert(
      'Berhasil',
      `Profil ${data.nama} tersimpan!`
    );

    reset();
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Profil"
        subtitle="Kelola informasi akunmu"
      />

      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accountSummary}>
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={36}
              color={COLORS.muted}
            />
          </View>

          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>
              {profilTersimpan?.nama || 'Akun KatalogKu'}
            </Text>

            <Text style={styles.accountEmail}>
              {profilTersimpan?.email ||
                'Lengkapi informasi profilmu'}
            </Text>
          </View>
        </View>

        <View style={styles.fields}>
          <CustomInput
            label="Nama Lengkap"
            value={values.nama}
            onChangeText={handleChange('nama')}
            error={errors.nama}
          />

          <CustomInput
            label="Email"
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            error={errors.email}
          />

          <View style={styles.fieldGroup}>
            <CustomInput
              label="No. HP"
              value={values.hp}
              keyboardType="phone-pad"
              onChangeText={handleChange('hp')}
              error={errors.hp}
            />

            <Text style={styles.helper}>
              No. HP diawali 08, terdiri dari 10–13 digit.
            </Text>
          </View>

          <View style={styles.fieldGroup}>
            <CustomInput
              label="Password"
              value={values.password}
              secureTextEntry
              onChangeText={handleChange('password')}
              error={errors.password}
            />

            <Text style={styles.helper}>
              Password minimal 8 karakter.
            </Text>
          </View>

          <CustomInput
            label="Ulangi Password"
            value={values.ulangiPassword}
            secureTextEntry
            onChangeText={handleChange('ulangiPassword')}
            error={errors.ulangiPassword}
          />
        </View>

        <Button
          title="Simpan Profil"
          onPress={handleSubmit(simpan)}
          disabled={adaFieldKosong}
        />

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  form: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 12,
  },

  accountSummary: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 2,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  accountInfo: {
    flex: 1,
    gap: 8,
  },

  accountName: {
    fontSize: 15,
    color: COLORS.text,
  },

  accountEmail: {
    fontSize: 13,
    color: COLORS.muted,
  },

  fields: {
    gap: 12,
  },

  fieldGroup: {
    gap: 8,
  },

  helper: {
    fontSize: 13,
    color: COLORS.muted,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    marginTop: 12,
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
