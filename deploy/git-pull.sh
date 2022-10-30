#!/bin/sh

BRANCH_NAME=develop  
 
echo "Stopping containers..."
sudo docker-compose down 

cd ../

echo "About to pull ${BRANCH_NAME} branch."
sudo git pull origin ${BRANCH_NAME}
  
echo "Done! Now start containers again."