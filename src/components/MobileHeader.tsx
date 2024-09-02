import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa6'

interface Props {
  title?: string
}
const MobileHeader: React.FC<Props> = ({ title = '' }) => {
  return (
    <div className="flex justify-center items-center bg-slate-300 h-9">
      <div className="absolute left-4">
        <Link href="/" passHref>
          <FaChevronLeft />
        </Link>
      </div>
      <div>{title}</div>
    </div>
  )
}

export default MobileHeader
