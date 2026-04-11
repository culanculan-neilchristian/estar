import config from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config}>
    {children}
  </RootLayout>
)

export default Layout
