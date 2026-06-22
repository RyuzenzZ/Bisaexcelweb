import { AuthFormPage, AuthInput, AuthLink, Button, ROUTES } from './AuthFormPage'

export function ResetPasswordPage() {
  return (
    <AuthFormPage
      title="Reset Password"
      description="Buat password baru untuk akun BisaExcel kamu."
      footer={<AuthLink to={ROUTES.LOGIN}>Kembali ke login</AuthLink>}
      notice="Reset password belum menyimpan data production. Fitur ini akan aktif setelah sistem akun backend tersedia."
    >
      <AuthInput label="Password Baru" placeholder="Masukkan password baru" type="password" />
      <AuthInput label="Konfirmasi Password" placeholder="Ulangi password baru" type="password" />
      <Button className="w-full" type="button">Simpan Password</Button>
    </AuthFormPage>
  )
}