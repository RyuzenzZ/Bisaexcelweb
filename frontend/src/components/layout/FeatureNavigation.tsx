import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export function FeatureNavigation() {
  const navigate = useNavigate()

  function handleBack() {
    navigate(ROUTES.home)
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mb-8 flex max-w-7xl px-4 sm:px-6"
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Button className="w-fit" onClick={handleBack} type="button" variant="ghost">
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Home
      </Button>
    </motion.div>
  )
}
