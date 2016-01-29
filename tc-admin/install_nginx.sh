# see: https://www.digitalocean.com/community/articles/how-to-install-the-latest-version-of-nginx-on-ubuntu-12-10
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update

# see: https://www.digitalocean.com/community/articles/how-to-install-nginx-on-ubuntu-12-04-lts-precise-pangolin
sudo apt-get install nginx
update-rc.d nginx defaults

# http://stackoverflow.com/questions/5009324/node-js-nginx-and-now
echo "# the IP(s) on which your node server is running. I chose port 40000.
upstream admin_v2 {
    server 127.0.0.1:40000;
}

# the nginx server instance
server {
    listen 0.0.0.0:80;
    server_name admin.tallcatqa.com;
    access_log /var/log/nginx/admin_v2.log;

    # pass the request to the node.js server with the correct headers and much more can be added, see nginx config options
    location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade \$http_upgrade;
      proxy_set_header Connection upgrade;
      proxy_set_header X-Real-IP \$remote_addr;
      proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header Host \$http_host;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://admin_v2/;
      proxy_redirect off;
    }
 }" > /etc/nginx/sites-available/admin_v2

cd /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/admin_v2 admin_v2

# verify config files
sudo nginx -t
# restart service
sudo /etc/init.d/nginx restart