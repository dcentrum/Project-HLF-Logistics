const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var util = require('util');
var cors = require('cors');

const PORT = 8080;
const HOST = 'localhost';

var refDataHelper = require('./refDataHelper');
var authUtils = require('./authUtils');
var FabricSdkService = require('./FabricSdkService');


app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use((req, res, next) => {
	FabricSdkService.attachFabricClient(req);
	next();
});
app.use(authUtils.userValidation);

app.get('/api/manufacturers', async (req, res) => {	
		res.status(200).json(refDataHelper.getManufacturers());	
});
app.get('/api/shippers', async (req, res) => {	
	res.status(200).json(refDataHelper.getShippers());	
});
app.get('/api/retailers', async (req, res) => {	
	res.status(200).json(refDataHelper.getRetailers());	
});
app.get('/api/bookings', async (req, res) => {
	const request = {
		chaincodeId: 'blockcc',
		fcn: 'getAllBookings',
		args: [req.org]
	};
	req.channel.queryByChaincode(request).then((query_responses) => {
		if (query_responses && query_responses.length == 1) {
			if (query_responses[0] instanceof Error) {
				console.error("error from query = ", query_responses[0]);
			} else {
			}
		} else {
			console.log("No payloads were returned from query");
		}
		res.status(200).json(query_responses[0].toString());
	}).catch(function (err) {
		res.status(500).json({ error: err.toString() })
	})
});
app.get('/api/booking', async (req, res) => {
	const request = {
		chaincodeId: 'blockcc',
		fcn: 'queryBooking',
		args: [req.query.key]
	};
	req.channel.queryByChaincode(request).then((query_responses) => {
		if (query_responses && query_responses.length == 1) {
			if (query_responses[0] instanceof Error) {
				console.error("error from query = ", query_responses[0]);
			}
		} else {
			console.log("No payloads were returned from query");
		}
		res.status(200).json(query_responses[0].toString());
	}).catch(function (err) {
		res.status(500).json({ error: err.toString() })
	})
});
app.post('/api/booking', async (req, res) => {
	tx_id = req.fabricClient.newTransactionID();
	var request = {
		chaincodeId: 'blockcc',
		fcn: 'createBooking',
		args: [req.body.prop1, req.body.prop2],
		chainId: 'commonchannel',
		txId: tx_id
	};
	req.channel.sendTransactionProposal(request).then((results) => {
		var proposalResponses = results[0];
		var proposal = results[1];
		let isProposalGood = false;
		if (proposalResponses && proposalResponses[0].response &&
			proposalResponses[0].response.status === 200) {
			isProposalGood = true;
		} else {
			console.error('Transaction proposal was bad');
		}
		if (isProposalGood) {
			var request = {
				proposalResponses: proposalResponses,
				proposal: proposal
			};

			var transaction_id_string = tx_id.getTransactionID();
			var promises = [];

			var sendPromise = req.channel.sendTransaction(request);
			promises.push(sendPromise);
			let event_hub = req.channel.newChannelEventHub(req.peer);
			let txPromise = new Promise((resolve, reject) => {
				let handle = setTimeout(() => {
					event_hub.unregisterTxEvent(transaction_id_string);
					event_hub.disconnect();
					resolve({ event_status: 'TIMEOUT' });
				}, 30000);
				event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
					clearTimeout(handle);
					var return_status = { event_status: code, tx_id: transaction_id_string };
					if (code !== 'VALID') {
						console.error('The transaction was invalid, code = ' + code);
						resolve(return_status);
					} else {
						console.log('The transaction has been committed on peer ' + event_hub.getPeerAddr());
						resolve(return_status);
					}
				}, (err) => {
					reject(new Error('There was a problem with the eventhub ::' + err));
				},
					{ disconnect: true }
				);
				event_hub.connect();

			});
			promises.push(txPromise);

			return Promise.all(promises);
		} else {
			console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
			throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
		}
	}).then((results) => {
		console.log('Send transaction promise and event listener promise have completed');
		// check the results in the order the promises were added to the promise all list
		if (results && results[0] && results[0].status === 'SUCCESS') {
			console.log('Successfully sent transaction to the orderer.');
		} else {
			console.error('Failed to order the transaction. Error code: ' + results[0].status);
		}

		if (results && results[1] && results[1].event_status === 'VALID') {
			console.log('Successfully committed the change to the ledger by the peer');
		} else {
			console.log('Transaction failed to be committed to the ledger due to ::' + results[1].event_status);
		}
		//req.channel.queryInfo(peer).then((Blockchain) => {
		req.channel.queryBlockByTxID(results[1].tx_id).then((Block) => {
			res.status(200).json({ 'result1': results[0], 'result2': results[1], 'Block': Block });
		})

	}).catch((err) => {
		console.error('Failed to invoke successfully :: ' + err);
	});
});
app.post('/api/booking/:bookingid/package', async (req, res) => {
	tx_id = req.fabricClient.newTransactionID();
	var request = {
		chaincodeId: 'blockcc',
		fcn: 'addPackage',
		args: [req.query.Bookingid,req.body.package.prop1, req.body.package.prop2],
		chainId: 'commonchannel',
		txId: tx_id
	};
	req.channel.sendTransactionProposal(request).then((results) => {
		var proposalResponses = results[0];
		var proposal = results[1];
		let isProposalGood = false;
		if (proposalResponses && proposalResponses[0].response &&
			proposalResponses[0].response.status === 200) {
			isProposalGood = true;
		} else {
			console.error('Transaction proposal was bad');
		}
		if (isProposalGood) {
			var request = {
				proposalResponses: proposalResponses,
				proposal: proposal
			};

			var transaction_id_string = tx_id.getTransactionID();
			var promises = [];

			var sendPromise = req.channel.sendTransaction(request);
			promises.push(sendPromise);
			let event_hub = req.channel.newChannelEventHub(req.peer);
			let txPromise = new Promise((resolve, reject) => {
				let handle = setTimeout(() => {
					event_hub.unregisterTxEvent(transaction_id_string);
					event_hub.disconnect();
					resolve({ event_status: 'TIMEOUT' });
				}, 30000);
				event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
					clearTimeout(handle);
					var return_status = { event_status: code, tx_id: transaction_id_string };
					if (code !== 'VALID') {
						console.error('The transaction was invalid, code = ' + code);
						resolve(return_status);
					} else {
						console.log('The transaction has been committed on peer ' + event_hub.getPeerAddr());
						resolve(return_status);
					}
				}, (err) => {
					reject(new Error('There was a problem with the eventhub ::' + err));
				},
					{ disconnect: true }
				);
				event_hub.connect();

			});
			promises.push(txPromise);

			return Promise.all(promises);
		} else {
			console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
			throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
		}
	}).then((results) => {
		console.log('Send transaction promise and event listener promise have completed');
		// check the results in the order the promises were added to the promise all list
		if (results && results[0] && results[0].status === 'SUCCESS') {
			console.log('Successfully sent transaction to the orderer.');
		} else {
			console.error('Failed to order the transaction. Error code: ' + results[0].status);
		}

		if (results && results[1] && results[1].event_status === 'VALID') {
			console.log('Successfully committed the change to the ledger by the peer');
		} else {
			console.log('Transaction failed to be committed to the ledger due to ::' + results[1].event_status);
		}
		//req.channel.queryInfo(peer).then((Blockchain) => {
		req.channel.queryBlockByTxID(results[1].tx_id).then((Block) => {
			res.status(200).json({ 'result1': results[0], 'result2': results[1], 'Block': Block });
		})

	}).catch((err) => {
		console.error('Failed to invoke successfully :: ' + err);
	});
});
app.post('/api/booking/:bookingid/shipping/order', async (req, res) => {
	tx_id = req.fabricClient.newTransactionID();
	var request = {
		chaincodeId: 'blockcc',
		fcn: 'addShipment',
		args: [req.query.Bookingid,req.body.package.prop1, req.body.package.prop2],
		chainId: 'commonchannel',
		txId: tx_id
	};
	req.channel.sendTransactionProposal(request).then((results) => {
		var proposalResponses = results[0];
		var proposal = results[1];
		let isProposalGood = false;
		if (proposalResponses && proposalResponses[0].response &&
			proposalResponses[0].response.status === 200) {
			isProposalGood = true;
		} else {
			console.error('Transaction proposal was bad');
		}
		if (isProposalGood) {
			var request = {
				proposalResponses: proposalResponses,
				proposal: proposal
			};

			var transaction_id_string = tx_id.getTransactionID();
			var promises = [];

			var sendPromise = req.channel.sendTransaction(request);
			promises.push(sendPromise);
			let event_hub = req.channel.newChannelEventHub(req.peer);
			let txPromise = new Promise((resolve, reject) => {
				let handle = setTimeout(() => {
					event_hub.unregisterTxEvent(transaction_id_string);
					event_hub.disconnect();
					resolve({ event_status: 'TIMEOUT' });
				}, 30000);
				event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
					clearTimeout(handle);
					var return_status = { event_status: code, tx_id: transaction_id_string };
					if (code !== 'VALID') {
						console.error('The transaction was invalid, code = ' + code);
						resolve(return_status);
					} else {
						console.log('The transaction has been committed on peer ' + event_hub.getPeerAddr());
						resolve(return_status);
					}
				}, (err) => {
					reject(new Error('There was a problem with the eventhub ::' + err));
				},
					{ disconnect: true }
				);
				event_hub.connect();

			});
			promises.push(txPromise);

			return Promise.all(promises);
		} else {
			console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
			throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
		}
	}).then((results) => {
		console.log('Send transaction promise and event listener promise have completed');
		// check the results in the order the promises were added to the promise all list
		if (results && results[0] && results[0].status === 'SUCCESS') {
			console.log('Successfully sent transaction to the orderer.');
		} else {
			console.error('Failed to order the transaction. Error code: ' + results[0].status);
		}

		if (results && results[1] && results[1].event_status === 'VALID') {
			console.log('Successfully committed the change to the ledger by the peer');
		} else {
			console.log('Transaction failed to be committed to the ledger due to ::' + results[1].event_status);
		}
		//req.channel.queryInfo(peer).then((Blockchain) => {
		req.channel.queryBlockByTxID(results[1].tx_id).then((Block) => {
			res.status(200).json({ 'result1': results[0], 'result2': results[1], 'Block': Block });
		})

	}).catch((err) => {
		console.error('Failed to invoke successfully :: ' + err);
	});
});
app.delete('/api/booking/:bookingid', async (req, res) => {
	tx_id = req.fabricClient.newTransactionID();
	var request = {
		chaincodeId: 'blockcc',
		fcn: ('deleteBooking'),
		args: [req.query.bookingid],
		chainId: 'commonchannel',
		txId: tx_id
	};
	req.channel.sendTransactionProposal(request).then((results) => {
		var proposalResponses = results[0];
		var proposal = results[1];
		let isProposalGood = false;

		console.log(results);
		if (proposalResponses && proposalResponses[0].response &&
			proposalResponses[0].response.status === 200) {
			isProposalGood = true;
		} else {
			console.error('Transaction proposal was bad');
		}
		if (isProposalGood) {
			var request = {
				proposalResponses: proposalResponses,
				proposal: proposal
			};
			var transaction_id_string = tx_id.getTransactionID();
			var promises = [];

			var sendPromise = req.channel.sendTransaction(request);
			promises.push(sendPromise);
			let event_hub = req.channel.newChannelEventHub(req.peer);
			let txPromise = new Promise((resolve, reject) => {
				let handle = setTimeout(() => {
					event_hub.unregisterTxEvent(transaction_id_string);
					event_hub.disconnect();
					resolve({ event_status: 'TIMEOUT' });
				}, 30000);
				event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
					clearTimeout(handle);
					var return_status = { event_status: code, tx_id: transaction_id_string };
					if (code !== 'VALID') {
						console.error('The transaction was invalid, code = ' + code);
						resolve(return_status);
					} else {
						console.log('The transaction has been committed on peer ' + event_hub.getPeerAddr());
						resolve(return_status);
					}
				}, (err) => {
					reject(new Error('There was a problem with the eventhub ::' + err));
				},
					{ disconnect: true }
				);
				event_hub.connect();

			});
			promises.push(txPromise);

			return Promise.all(promises);
		} else {
			console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
			throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
		}
	}).then((results) => {
		if (results && results[0] && results[0].status === 'SUCCESS') {
			console.log('Successfully sent transaction to the orderer.');
		} else {
			console.error('Failed to order the transaction. Error code: ' + results[0].status);
		}

		if (results && results[1] && results[1].event_status === 'VALID') {
			console.log('Successfully committed the change to the ledger by the peer');
		} else {
			console.log('Transaction failed to be committed to the ledger due to ::' + results[1].event_status);
		}
		res.status(200).json({ 'result1': results[0], 'tx_id': results[1].tx_id });
	}).catch((err) => {
		console.error('Failed to invoke successfully :: ' + err);
	});
});
app.get('/api/booking/:bookingid/history', async (req, res) => {

	const request = {
		//targets : --- letting this default to the peers assigned to the channel
		chaincodeId: 'blockcc',
		fcn: 'bookingHistory',
		args: [req.query.bookingid]
	};
	req.channel.queryByChaincode(request).then((query_responses) => {
		console.log("Query has completed, checking results");
		console.log(query_responses);
		// query_responses could have more than one  results if there multiple peers were used as targets
		if (query_responses && query_responses.length == 1) {
			if (query_responses[0] instanceof Error) {
				console.error("error from query = ", query_responses[0]);
			} else {
				console.log("Response is ", query_responses[0].toString());
			}
		} else {
			console.log("No payloads were returned from query");
		}
		res.status(200).json(query_responses[0].toString());
	}).catch(function (err) {
		res.status(500).json({ error: err.toString() })
	})
});
app.get('/api/blockchain', async (req, res) => {
	req.channel.queryInfo(req.peer).then((blockchain) => {
		res.status(200).json(blockchain);
	}).catch(function (err) {
		res.status(500).json({ error: err.toString() })
	})
});
app.get('/api/block', async (req, res) => {
	req.channel.queryBlockByTxID(req.query.txid).then((block) => {
		res.status(200).json(block);
	}).catch(function (err) {
		res.status(500).json({ error: err.toString() })
	})
});
app.get('/api/trans', async (req, res) => {
	req.channel.queryTransaction(req.query.txid).then((trans) => {
		res.status(200).json(trans);
	}).catch(function (err) {
		res.status(500).json({ error: err.toString() })
	});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);