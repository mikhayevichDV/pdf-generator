#!/bin/bash

###########################################################
# Note: Use this script only for stage or production.     #
###########################################################


### 1. Generate keys files #############################################################################################

echo -e "\e[32mCreate keys\e[0m"
PUBLIC_KEY="./keys/key.pub"
PRIVATE_KEY="./keys/key.pem"
if [ ! -f "$PUBLIC_KEY" ] && [ ! -f "$PRIVATE_KEY" ]
then
	openssl genpkey -algorithm RSA -out keys/key.pem -pkeyopt rsa_keygen_bits:3072
  openssl rsa -in keys/key.pem -pubout -out keys/key.pub
else
	echo -e "\e[32mKeys are exists\e[0m"
fi



### 2. Prepare postgres ################################################################################################

echo -e "\e[32mConfigurable DB \e[0m"
npm run database:init --loglevel=error



### 3. Migrations up ###################################################################################################

echo -e "\e[32mUp migrations\e[0m"
npm run migration:up --loglevel=error



### 4. Load fixtures ###################################################################################################

echo -e "\e[32mLoad fixtures\e[0m"
npm run fixtures:load --loglevel=error
