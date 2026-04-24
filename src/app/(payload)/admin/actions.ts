'use server'

import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap'

export const handleServerFunctions = async (args: any) =>
  payloadHandleServerFunctions({
    ...args,
    config,
    importMap,
  })
