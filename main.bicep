//targetScope = 'subscription'

// Parameters
param rgName string
param rgLocation string
param backendName string
param frontendName string

// Creating resource group
// module rgModule 'rg.bicep' = {
//   scope: subscription()
//   name: '${rgName}-RG-create'
//   params:{
//     name: rgName
//     location: rgLocation
//   }  
// }

// Deploying resources in the newly created resource
module resources 'resources.bicep' = {
  name: '${rgName}-RG-resources-deployment'
  scope: resourceGroup('${rgName}-RG')
  //dependsOn: [ rgModule ]
  params: {
    name: rgName
    location: rgLocation
    backendName: backendName
    frontendName: frontendName
  }
}
