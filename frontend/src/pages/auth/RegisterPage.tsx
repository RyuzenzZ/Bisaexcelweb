import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { AuthFormPage, AuthLink, Button, ROUTES } from './AuthFormPage'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    setError('')
    setIsSubmitting(true)
    try {
      await register({ name, username, email, password })
      navigate(ROUTES.DASHBOARD)
    } catch {
      setError('Data daftar belum cocok. Cek email, username, dan password minimal 8 karakter ya.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthFormPage
      title="Daftar BisaExcel"
      description="Daftar biar hasil test, progress, level, portfolio, dan certificate kamu benar-benar tersimpan."
      footer={<>Sudah punya akun? <AuthLink to={ROUTES.LOGIN}>Login</AuthLink></>}
      notice="Akun MVP sudah tersambung ke backend. Gunakan email dan username yang unik."
    >
      <AuthTextInput label="Nama" onChange={setName} placeholder="Nama lengkap" value={name} />
      <AuthTextInput label="Username" onChange={(value) => setUsername(value.toLowerCase())} placeholder="username_belajar" value={username} />
      <AuthTextInput label="Email" onChange={setEmail} placeholder="nama@email.com" type="email" value={email} />
      <AuthTextInput label="Password" onChange={setPassword} placeholder="Minimal 8 karakter" type="password" value={password} />
      {error ? <p className="rounded-lg border border-red-800/40 bg-red-950/30 px-3 py-2 text-sm text-red-200">{error}</p> : null}
      <Button className="w-full" disabled={isSubmitting || !name || !username || !email || password.length < 8} onClick={handleSubmit} type="button">{isSubmitting ? 'Mendaftarkan...' : 'Daftar'}</Button>
    </AuthFormPage>
  )
}

function AuthTextInput({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8BA98F]">{label}</span><input className="w-full rounded-lg border border-[#1E3022] bg-[#0F1A12] px-4 py-2.5 text-sm font-medium text-[#E8F0EA] outline-none placeholder:text-[#4D6650] focus:border-green-600 focus:ring-1 focus:ring-green-600/30" onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} /></label>
}