import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Dashboard',
} 

type DashboardLayoutProps = {
  children: React.ReactNode;
}


export default function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <section>
      {children}
    </section>
  )
}