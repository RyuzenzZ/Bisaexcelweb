import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { AuthFormPage, AuthLink, Button, ROUTES } from './AuthFormPage'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    setError('')
    setIsSubmitting(true)
    try {
      await login({ emailOrUsername, password })
      navigate(ROUTES.DASHBOARD)
    } catch {
      setError('Email/username atau password belum cocok. Coba cek lagi ya.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthFormPage
      title="Masuk ke BisaExcel"
      description="Masuk dulu biar hasil test, progress, level, portfolio, dan certificate kamu tersimpan ke backend."
      footer={<>Belum punya akun? <AuthLink to={ROUTES.REGISTER}>Daftar akun</AuthLink></>}
      notice="Sistem akun backend sudah aktif untuk MVP. Token dev disimpan di browser agar dashboard bisa mengambil progress kamu."
    >
      <AuthTextInput label="Email atau Username" onChange={setEmailOrUsername} placeholder="nama@email.com atau username" value={emailOrUsername} />
      <AuthTextInput label="Password" onChange={setPassword} placeholder="Masukkan password" type="password" value={password} />
      <div className="text-right"><AuthLink to={ROUTES.FORGOT_PASSWORD}>Lupa password?</AuthLink></div>
      {error ? <p className="rounded-lg border border-red-800/40 bg-red-950/30 px-3 py-2 text-sm text-red-200">{error}</p> : null}
      <Button className="w-full" disabled={isSubmitting || !emailOrUsername || !password} onClick={handleSubmit} type="button">{isSubmitting ? 'Masuk...' : 'Masuk'}</Button>
    </AuthFormPage>
  )
}

function AuthTextInput({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">{label}</span><input className="w-full rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-2.5 text-sm font-medium text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600 focus:ring-1 focus:ring-green-600/30" onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} /></label>
}