terraform {
  required_version = ">= 1.7.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  # TODO [CHALLENGE: Infrastructure] - Configure remote state so teams can collaborate
  # backend "azurerm" {
  #   resource_group_name  = "rg-tfstate"
  #   storage_account_name = "sttfstatehealthwards"
  #   container_name       = "tfstate"
  #   key                  = "project-health-wards.tfstate"
  # }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    project     = "virtual-wards"
    environment = var.environment
    managed_by  = "terraform"
  }
}

# Frontend — Azure Static Web Apps (free tier)
# TODO [CHALLENGE: Infrastructure] - Upgrade to Standard tier for custom domains and auth
resource "azurerm_static_web_app" "frontend" {
  name                = "${var.prefix}-frontend"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_tier            = "Free"

  tags = {
    component   = "frontend"
    environment = var.environment
  }
}

# API — Azure App Service (Linux / Node 20)
resource "azurerm_service_plan" "api" {
  name                = "${var.prefix}-plan"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "B1" # TODO [CHALLENGE: Infrastructure] - right-size for production load

  tags = {
    component   = "api"
    environment = var.environment
  }
}

resource "azurerm_linux_web_app" "api" {
  name                = "${var.prefix}-api"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.api.id

  site_config {
    application_stack {
      node_version = "20-lts"
    }
    always_on = false # set to true for production
  }

  app_settings = {
    NODE_ENV     = var.environment
    DATABASE_URL = var.database_url
    # TODO [CHALLENGE: Security] - Use Azure Key Vault references instead of plain app settings
    # DATABASE_URL = "@Microsoft.KeyVault(SecretUri=...)"
  }

  tags = {
    component   = "api"
    environment = var.environment
  }
}
