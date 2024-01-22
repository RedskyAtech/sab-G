import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.sabG',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'full',
  },
} as NativeScriptConfig
