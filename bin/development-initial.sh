#!/bin/bash

###########################################################
# Note: Use this script only for local deploy.          #
###########################################################


### 1. Install packages ################################################################################################

echo -e "\e[32mInstall dependencies\e[0m"
npm i --loglevel=error



### 2. Generate .env file ##############################################################################################

echo -e "\e[32mCreate environment configuration\e[0m"
npm run generate-env:manual --loglevel=error



### 3. Generate keys files #############################################################################################

echo -e "\e[32mCreate keys\e[0m"
npm run keys:generation --loglevel=error



### 4. Prepare postgres ################################################################################################

echo -e "\e[32mConfigurable DB \e[0m"
npm run database:init --loglevel=error



### 5. Migrations up ###################################################################################################

echo -e "\e[32mUp migrations\e[0m"
npm run migration:up --loglevel=error



### 5. Load fixtures ###################################################################################################

echo -e "\e[32mLoad fixtures\e[0m"
npm run fixtures:load --loglevel=error
