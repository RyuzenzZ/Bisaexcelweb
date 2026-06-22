import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(scryptCallback)
const keyLength = 64

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scrypt(password, salt, keyLength)) as Buffer
  return `scrypt$${salt}$${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  const [method, salt, hash] = passwordHash.split('$')
  if (method !== 'scrypt' || !salt || !hash) return false
  const expected = Buffer.from(hash, 'hex')
  const actual = (await scrypt(password, salt, expected.length)) as Buffer
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}