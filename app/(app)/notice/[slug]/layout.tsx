interface NoticeDetailLayoutProps {
  children: React.ReactNode
}

export default function NoticeDetailLayout({ children }: NoticeDetailLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white py-8 md:py-12">
      {children}
    </div>
  )
}

