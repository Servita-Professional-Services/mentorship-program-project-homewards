output "frontend_url" {
  description = "URL of the deployed Static Web App"
  value       = azurerm_static_web_app.frontend.default_host_name
}

output "api_url" {
  description = "URL of the deployed API App Service"
  value       = azurerm_linux_web_app.api.default_hostname
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}
