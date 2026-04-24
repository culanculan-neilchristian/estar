import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'
import { handleServerFunctions } from './admin/actions'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={handleServerFunctions}>
      {children}
    </RootLayout>
  )
}
