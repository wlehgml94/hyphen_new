#!/bin/bash

su ec2-user
sudo rm -rf /var/www/html/wp-content/themes/hyphen_v2
sleep 1
sudo mv /home/ec2-user/githubcicd_wordpress/  /var/www/html/wp-content/themes/hyphen_v2
sleep 1

#sudo rm -rf  /var/www/html/wp-config.php
#sudo mv /var/www/html/wp-content/dev_wp-config.php   /var/www/html/wp-config.php
#sudo mv /var/www/html/wp-content/common_htaccess   /var/www/html/.htaccess
#sudo rm -rf /var/www/html/wp-content/prod_wp-config.php

#sudo chown ec2-user:apache  -R  /var/www/html
sudo chown  apache:ec2-user   -R  /var/www/html
sudo chmod    775   -R  /var/www/html 

##----- END ------
