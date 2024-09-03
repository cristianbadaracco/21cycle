import MobileHeader from '@/components/MobileHeader'

interface LayoutProps {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <MobileHeader title="Período" />
      {children}
    </div>
  )
}

export default Layout
