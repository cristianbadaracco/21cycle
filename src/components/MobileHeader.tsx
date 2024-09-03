import Link from 'next/link'

import { BackIcon } from './icons/Icons'

interface Props {
  title?: string
}
const MobileHeader: React.FC<Props> = ({ title = '' }) => {
  return (
    <div className="flex justify-center items-center bg-header h-12 md:hidden">
      <div className="absolute left-4">
        <Link href="/" passHref>
          <BackIcon />
        </Link>
      </div>
      <div>{title}</div>
    </div>
  )
}

export default MobileHeader
