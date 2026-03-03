variable "resource_group_name" {
  type        = string
  description = "Name of the Azure resource group"
  default     = "rg-virtual-wards-dev"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "uksouth"
}

variable "environment" {
  type        = string
  description = "Deployment environment: dev, staging, or prod"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "prefix" {
  type        = string
  description = "Prefix applied to all resource names"
  default     = "virtualwards"
}

variable "database_url" {
  type        = string
  description = "PostgreSQL connection string"
  sensitive   = true
}
