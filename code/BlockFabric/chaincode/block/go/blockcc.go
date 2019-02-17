/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the car structure, with 4 properties.  Structure tags are used by encoding/json library
type BlockRecord struct {
	Property1 string `json:"property1"`
	property2 string `json:"property2"`
}

type Participant struct {
	Name          string `json:"name"`
	Code          string `json:"code"`
	ContactNumber string `json:"contactnumber"`
	Email         string `json:"email"`
	Address       string `json:"address"`
}

//Define the Manufacturer Structure
type Manufacturer struct {
	Name          string `json:"name"`
	Code          string `json:"code"`
	ContactNumber string `json:"ContactNumber"`
	Email         string `json:"email"`
	Address       string `json:"address"`
}

//Define the Shipper Structure
type Shipper struct {
	Name          string `json:"name"`
	Code          string `json:"code"`
	ContactNumber string `json:"ContactNumber"`
	Email         string `json:"email"`
	Address       string `json:"address"`
}

//Define the Retailer Structure
type Retailer struct {
	Name          string `json:"name"`
	Code          string `json:"code"`
	ContactNumber string `json:"ContactNumber"`
	Email         string `json:"email"`
	Address       string `json:"address"`
}

type BookingOrder struct {
	BookingNumber       int    `json:bookingNo`
	BookingDate         string `json:bookingDate`
	Shipper             string `json:shipper`
	Retailer            string `json:retailer`
	Manufacturer        string `json:manufacturer`
	Notes               string `json:notes`
	DriverId            string `json:driverId`
	DriverSig           string `json:driverSignature`
	DriverSigDate       string `json:driverSigDate`
	ManufacturerSig     string `json:manufacturerSignature`
	ManufacturerSigDate string `json:manufacturerSigDate`
	Status              string `json:bookingStatus`
}

type ShipmentOrder struct {
	BookingNumber int    `json:bookingNo`
	BookingDate   string `json:bookingDate`
	Shipper       string `json:shipper`
	Retailer      string `json:retailer`
	Manufacturer  string `json:manufacturer`
	Notes         string `json:notes`

	DriverToManufacturerSigDate string `json:driverSigDate`
	ManufacturerSig             string `json:manufacturerSignature`
	ManufacturerSigDate         string `json:manufacturerSigDate`
	DriverToManufacturerSig     string `json:manufacturerSig`

	DriverToRetailerSig     string `json:driverSignature`
	DriverToRetailerSigDate string `json:driverSigDate`
	RatailerSig             string `json:manufacturerSignature`
	RetailerSigDate         string `json:RetailerSigDate`

	NotesAtManufacturer string `json:notesAtManufacturer`
	NotesAtRetailer     string `json:notesAtRetailer`

	Driver  string `json:driverId`
	Vehicle string `json:vehicleId`
	Status  string `json:bookingStatus`
}

type Package struct {
	BookingNumber    int    `json:bookingNo`
	RWBNumber        int    `json:RWBNo`
	HsnNumber        int    `json:hsnNo`
	ProductName      string `json:productName`
	ProductType      string `json:productType`
	ProductQty       int    `json:qty`
	ProductSize      string `json:ProductSize`
	PickupDate       string `json:PickupDate`
	PickupLocation   string `json:PickupLocation`
	DeliveryDate     string `json:deliveryDate`
	DeliveryLocation string `json:deliveryLocation`
	Status           string `json:shipmentStatus`
}
type shipmentStatus int

const (
	ShipmentOrderPlaced shipmentStatus = 1
	ShipmentApproved    shipmentStatus = 2
	ShipmentRejected    shipmentStatus = 3
	DriverAssigned      shipmentStatus = 4
	DriverRejected      shipmentStatus = 5
	ShipmentPicked      shipmentStatus = 6
	Intransit           shipmentStatus = 7
	Delivered           shipmentStatus = 8
	RetailerRejected    shipmentStatus = 9
	Verified            shipmentStatus = 10
	Completed           shipmentStatus = 11
)

/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "fcn" {
		return s.fcn(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "getAllShipments" {
		return s.getAllShipments(APIstub)
	} else if function == "createPackage" {
		return s.createPackage(APIstub, args)
	} else if function == "updatePackage" {
		return s.updatePackageStatus(APIstub, args)
	} else if function == "getAllPackages" {
		return s.getAllPackages(APIstub)
	} else if function == "createShipment" {
		return s.createShipment(APIstub, args)
	} else if function == "updateShipment" {
		return s.updateShipment(APIstub, args)
	} else if function == "queryPackage" {
		return s.queryPackage(APIstub, args)
	} else if function == "queryShipment" {
		return s.queryShipment(APIstub, args)
	}

	// return shim.Error("Invalid Smart Contract function name.")
	return shim.Success(nil)
}

func (s *SmartContract) fcn(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(carAsBytes)
}

func (s *SmartContract) createPackage(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) >= 5 {
		return shim.Error("Incorrect number of arguments. Expecting Minimum 5")
	}

	var Package = Package{BookingNumber: args[0], RWBNumber: args[1], HsnNumber: args[2], Vin: args[3], ProductName: args[4], ProductType: args[5], ProductQty: args[6], ProductSize: args[7], PickupDate: args[8], PickupLocation: args[9], DeliveryDate: args[10], DeliveryLocation: args[11], status: args[12]}

	PackageAsBytes, _ := json.Marshal(Package)
	APIstub.PutState(args[0], PackageAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) queryShipment(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	shipmentAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error(err.Error())
	}
	fmt.Printf(string(shipmentAsBytes))
	return shim.Success(shipmentAsBytes)
}

func (s *SmartContract) queryPackage(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	packageAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error(err.Error())
	}
	fmt.Printf(string(packageAsBytes))
	return shim.Success(packageAsBytes)
}

func (s *SmartContract) createShipment(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) >= 5 {
		return shim.Error("Incorrect number of arguments. Expecting Minimum 5")
	}

	var Shipment = Shipment{BookingNumber: args[0], CreateDate: args[1], Shipper: args[2], Vin: args[3], Retailer: args[4], Manufacturer: args[5], createPackage[6:]}

	ShipmentAsBytes, _ := json.Marshal(Shipment)
	APIstub.PutState(args[0], ShipmentAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) updatePackageStatus(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	PackageAsBytes, _ := APIstub.GetState(args[0])
	Package := Package{}

	json.Unmarshal(PackageAsBytes, &Package)
	Package.Status = args[1]

	PackageAsBytes, _ = json.Marshal(Package)
	APIstub.PutState(args[0], PackageAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) getAllShipments(APIstub shim.ChaincodeStubInterface) sc.Response {

	var startKey, endKey string

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()
	ShipmentList := []ShipmentOrder{}
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		ShipmentOrder := ShipmentOrder{}
		json.Unmarshal(queryResponse.Value, &ShipmentOrder)
		ShipmentList = append(ShipmentList, ShipmentOrder)
	}

	fmt.Printf("- queryAllMeds:\n%+v\n", ShipmentList)
	ShipmentOrderAsBytes, err := json.Marshal(ShipmentList)
	return shim.Success(ShipmentOrderAsBytes)
}

func (s *SmartContract) getAllPackages(APIstub shim.ChaincodeStubInterface) sc.Response {

	var startKey, endKey string

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()
	PackageList := []Package{}
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		Package := Package{}
		json.Unmarshal(queryResponse.Value, &Package)
		PackageList = append(PackageList, Package)
	}

	fmt.Printf("- queryAllMeds:\n%+v\n", PackageList)
	PackageAsBytes, err := json.Marshal(PackageList)
	return shim.Success(PackageAsBytes)
}

func (s *SmartContract) updateShipment(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	ShipmentOrderAsBytes, _ := APIstub.GetState(args[0])
	ShipmentOrder := ShipmentOrder{}

	json.Unmarshal(ShipmentAsBytes, &Shipment)
	ShipmentOrder.DriverToManufacturerSigDate = args[1]

	json.Unmarshal(ShipmentAsBytes, &Shipment)
	ShipmentOrder.DriverToManufacturerSig = args[1]

	json.Unmarshal(ShipmentAsBytes, &Shipment)
	ShipmentOrder.DriverToRetailerSig = args[1]

	json.Unmarshal(ShipmentAsBytes, &Shipment)
	ShipmentOrder.DriverToRetailerSigDate = args[1]

	PackageAsBytes, _ = json.Marshal(Package)
	APIstub.PutState(args[0], PackageAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	Manufacturers := []Manufacturer{
		Manufacturer{Name: "Tata Steel", Code: "TSC", ContactNumber: "+91-8988956445", Email: "info@tatasteel.com", Address: "Dadri,Mumbai,400078"},
		Manufacturer{Name: "Ecobliss", Code: "EBS", ContactNumber: "+91-9745889568", Email: "info@ecobliss.in", Address: "Amaravathi,AP,522020"},
	}

	i := 0
	for i < len(Manufacturers) {
		fmt.Println("i is ", i)
		manufacturerAsBytes, _ := json.Marshal(Manufacturers[i])
		APIstub.PutState(Manufacturers[i].Code, manufacturerAsBytes)
		fmt.Println("Added", Manufacturers[i])
		i = i + 1
	}

	Shippers := []Shipper{
		Shipper{Name: "Blue Dart", Code: "BDT", ContactNumber: "+91-9912356687", Email: "info@bludart.com", Address: "Delhi"},
		Shipper{Name: "VRL Logistics", Code: "VRL", ContactNumber: "+91-7696588587", Email: "info@vrl.com", Address: "Chandigarh"},
	}

	j := 0
	for j < len(Shippers) {
		fmt.Println("j is ", j)
		shipperAsBytes, _ := json.Marshal(Shippers[j])
		APIstub.PutState(Shippers[j].Code, shipperAsBytes)
		fmt.Println("Added", Shippers[j])
		j = j + 1
	}

	Retailers := []Retailer{
		Retailer{Name: "Dmart", Code: "DMT", ContactNumber: "+91-9014616163", Email: "info@dmart.com", Address: "Mumbai"},
		Retailer{Name: "Future Retail", Code: "FRT", ContactNumber: "+91-8885305669", Email: "info@futureretail.com", Address: "Punjab"},
	}

	k := 0
	for k < len(Retailers) {
		fmt.Println("k is ", k)
		retailerAsBytes, _ := json.Marshal(Retailers[k])
		APIstub.PutState(Retailers[k].Code, retailerAsBytes)
		fmt.Println("Added", Retailers[k])
		k = k + 1
	}

	return shim.Success(nil)
}

// =========================================================================================
// getQueryResultForQueryString executes the passed in query string.
// Result set is built and returned as a byte array containing the JSON results.
// =========================================================================================
func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())

	return buffer.Bytes(), nil
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
