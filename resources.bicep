// Define the parameters for the resource names
param name string
param location string
param backendName string
param frontendName string
param appServicePlanName string = '${name}-SP'
param appInsightsName string = '${frontendName}-insight'

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: appServicePlanName
  kind: 'app'
  location: location
  sku: {
    name: 'S1'
    tier: 'Standard'
    size: 'S1'
    family: 'S'
    capacity: 1
  }
}

// Application Insights
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  kind: 'web'
  location: location
  properties: {
    Application_Type: 'web'
  }
}

// Web App 1 (Frontend)
resource webApp1 'Microsoft.Web/sites@2021-02-01' = {
  name: frontendName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
         name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
         value: appInsights.properties.ConnectionString
        }
      ]
      windowsFxVersion: 'Node - ~18'
    }
  }
}

// Web App 2 (Backend)
resource webApp2 'Microsoft.Web/sites@2021-02-01' = {
  name: backendName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      windowsFxVersion: 'NODE|18.12.1'
    }
  }
}
