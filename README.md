# querynode
_a small nodejs instance to query jormungandr api locally_

## Set up your querynode instance

```bash
# Clone the repo to your node server
git clone https://github.com/standardize-network/querynode.git

# specify your public IP in the `app.js` file
cd querynode
nano app.js

# install dependencies
npm install

# starting your server
node app.js
```

You can find json data of your created api here: **`http://YOUR-IP-ADDRESS/5566/stake`**

## Run it in the background:

```bash
# install 'forever' globally on your system, to keep the querynode running and logging output to a file
npm i --global forever

# then you can do
forever start app.js

 # afterwords you can see your running processes here:

 forever list

 #and for stopping / restarting:

 forever restart PID-NR
 forever stop PID-NR
```
