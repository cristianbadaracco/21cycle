import Link from 'next/link'

import { BackIcon } from './icons/Icons'

interface Props {
  title?: string
}
const MobileHeader: React.FC<Props> = ({ title = '' }) => {
  return (
    <div className="flex justify-center items-center bg-background h-12 md:hidden">
      <div className="absolute left-4">
        <Link href="/" passHref>
          <BackIcon />
        </Link>
      </div>
      <span className="text-md font-bold">{title}</span>
    </div>
  )
}

export default MobileHeader
