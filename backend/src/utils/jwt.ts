import { createHmac } from 'crypto'

type TokenPayload = {
  sub: string
  email: string
  username: string
  role: string
  exp: number
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url')
}

function parseExpiresIn(value = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') {
  const match = value.match(/^(\d+)([smhd])$/)
  if (!match) return 15 * 60
  const amount = Number(match[1])
  const unit = match[2]
  if (unit === 's') return amount
  if (unit === 'm') return amount * 60
  if (unit === 'h') return amount * 60 * 60
  return amount * 24 * 60 * 60
}

function secret() {
  return process.env.JWT_ACCESS_SECRET ?? 'dev-only-bisaexcel-access-secret'
}

export function signAccessToken(payload: Omit<TokenPayload, 'exp'>) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const body: TokenPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + parseExpiresIn() }
  const encodedHeader = base64Url(JSON.stringify(header))
  const encodedPayload = base64Url(JSON.stringify(body))
  const signature = createHmac('sha256', secret()).update(`${encodedHeader}.${encodedPayload}`).digest('base64url')
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export function verifyAccessToken(token: string): TokenPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [encodedHeader, encodedPayload, signature] = parts
  const expected = createHmac('sha256', secret()).update(`${encodedHeader}.${encodedPayload}`).digest('base64url')
  if (signature !== expected) return null
  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as TokenPayload
    if (!payload.sub || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}