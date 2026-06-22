import { AuthFormPage, AuthInput, AuthLink, Button, ROUTES } from './AuthFormPage'

export function ForgotPasswordPage() {
  return (
    <AuthFormPage
      title="Lupa Password"
      description="Masukkan email akun untuk menerima instruksi reset password ketika sistem auth sudah aktif."
      footer={<AuthLink to={ROUTES.LOGIN}>Kembali ke login</AuthLink>}
      notice="Reset password akan aktif setelah auth production tersambung. Untuk sekarang, gunakan tombol masuk simulasi dari halaman login."
    >
      <AuthInput label="Email" placeholder="nama@email.com" type="email" />
      <Button className="w-full" type="button">Kirim Instruksi</Button>
    </AuthFormPage>
  )
}