echo ${PWD}
if [ -z "$NODE_MODULE_HOME" ]; then
    echo "There is no settings NODE_MODULE_HOME, using default /home/tallcat/"
    #exit 1
    export NODE_MODULE_HOME=/home/tallcat
fi
echo ${NODE_MODULE_HOME}
cd $NODE_MODULE_HOME

sudo apt-get -y install python-software-properties
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install nodejs npm
echo "export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules/:${NODE_MODULE_HOME}/node_modules" > ~/.bash_profile
source ~/.bash_profile
sudo apt-get update
sudo apt-get -y install libxml2-dev
sudo apt-get -y install build-essential g++
# node version 0.10.26
# npm version 1.4.3
npm config set registry http://registry.npmjs.org/

sudo npm install -g aws-sdk
sudo npm install -g redis
sudo npm install -g connect-redis@1.4.7
sudo npm install -g redis-pubsub
sudo npm install -g fmt

sudo npm install -g metrics
sudo npm install -g colors
sudo npm install -g underscore
sudo npm install -g underscore.string
sudo npm install -g express.io@3.4.7
sudo npm install -g pm2
sudo npm install -g swig
sudo npm install -g consolidate
sudo npm install -g mathjs0.18.1
sudo npm install -g xml2js

echo "NODE_PATH=/usr/local/lib/node_modules" >> /etc/environment

sudo cp -r /usr/lib/node_modules/ /usr/local/lib/

# reload environment variables
#supervisorctl shutdown
#supervisord
