## Hyperledger Fabric - Logistics

Hyperledger Fabric based solution for consortium of logistics companies in any distribution or supply-chain industries

Here assumption is that you have installed all [prerequisites](https://hyperledger-fabric.readthedocs.io/en/release-1.3/prereqs.html) that a standard Hyperledger Fabric requires.

We have three folders for three different layers

### BlockFabric
this folder contains all Fabric related cryptographic material, channel, genesis block and chaincode.

### BlockServer
this is web server based on nodejs and expressjs. facilitates following things.
* Acts as client for Fabric network by using **Fabric-Client** sdk
* Acts like a web server that wraps all the fabric interaction logic as REST API (GET, POST endpoints).
* Bridge between a user interface layer and fabric network layer.

 ### BlockClient
This is end user interface developed using Angular 7.
This consumes REST api to contact with **BlockServer** web server.

## Start Fabric
Run following commands in **BlockServer** folder to start network, install dependencies, enroll admin and register user.

```

cd BlockServer

npm install

cd BlockFabric

./startFabric.sh

```

## Start Web server
Run following commands in **BlockServer** folder to start the web server

```
node app.js
```

## Set up User interface
Open another terminal and run following commands in **BlockClient** folder to start the user interface application.

```
cd BlockClient

npm install -g @angular/cli

npm install

ng serve

```

After completion of above commands. open any web browser and follow this link http://localhost:4200


## Stop the network
To stop network after testing, run the given commands in **BlockFabric** folder
```
cd BlockFabric

./stop.sh
```

## Kill the network
To kill the complete network, use the **./teardown.sh** in **BlockFabric** folder

```
cd BlockFabric

./teardown.sh
```


Thank you.
