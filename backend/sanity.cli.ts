import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: "tigcvllx",
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    appId: 'yig1sy4v2xz2v7caspzb0c4f',
    autoUpdates: true
  },
})
