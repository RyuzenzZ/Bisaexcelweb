import { AuthFormPage, AuthLink, Button, ROUTES } from './AuthFormPage'

export function VerifyEmailPage() {
  return (
    <AuthFormPage
      title="Verifikasi Email"
      description="Nanti halaman ini dipakai untuk memastikan email peserta aktif sebelum mengakses fitur akun."
      footer={<AuthLink to={ROUTES.LOGIN}>Sudah verifikasi? Login</AuthLink>}
    >
      <div className="rounded-xl border border-[#1E3022] bg-[#0D1610] p-4 text-sm leading-6 text-[#8BA98F]">Kami akan mengirim link verifikasi ke email terdaftar setelah backend auth tersedia.</div>
      <Button className="w-full" type="button">Kirim Ulang Email</Button>
    </AuthFormPage>
  )
}
