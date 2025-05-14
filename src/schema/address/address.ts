import { Addresses, Address, Args, CreateAddressInput, CreateAddressArgs } from "./types";
import { logger, LogLevel } from "../../utils";
import { GraphQLError } from "graphql";
import * as jsonfile from 'jsonfile';
import * as path from 'path';
const addressesFilePath = path.join(__dirname, "../../../data/addresses.json");

async function readAddressesFromFile(): Promise<Addresses> {
  try {
    const data = await jsonfile.readFile(addressesFilePath);
    return data as Addresses; // Assume data is correctly formatted
  } catch (error: any) {
    logger(LogLevel.ERROR, "readAddressesFromFile", `Error reading addresses file: ${error.message}`);
    throw new GraphQLError("Could not read address data."); // Re-throw a GraphQL-friendly error
  }
}

async function writeAddressesToFile(data: Addresses): Promise<void> {
  try {
    await jsonfile.writeFile(addressesFilePath, data, { spaces : 1});
    logger(LogLevel.INFO, "writeAddressesToFile", "Addresses successfully written to file.");
  } catch (error: any) {
    logger(LogLevel.ERROR, "writeAddressesToFile", `Error writing addresses file: ${error.message}`);
    throw new GraphQLError("Could not save address data.");
  }
}

const _getAddress = async (username: string): Promise<Address | null> => {
  const currentAddresses = await readAddressesFromFile();
  return currentAddresses[username];
};

export const getAddress = async (_: any, args: Args, context: any): Promise<Address> => {
  logger(LogLevel.INFO, "getAddress", "Enter resolver");
  const address = await _getAddress(args.username);
  if (address) {
    logger(LogLevel.INFO, "getAddress", "Returning address");
    return address;
  }
  logger(LogLevel.ERROR, "getAddress", "No address found");
  throw new GraphQLError("No address found in getAddress resolver");
};

const _createAddress = async (username: string, createAddressInput: CreateAddressInput): Promise<Address> => {
  const currentAddresses = await readAddressesFromFile();
  if (currentAddresses[username]) {
    logger(LogLevel.ERROR, "_createAddress", "Username already has address. Creation Failed");
    throw new GraphQLError("Username already has address. Creation Failed");
  }

  currentAddresses[username] = createAddressInput;

  await writeAddressesToFile(currentAddresses)
  logger(LogLevel.INFO, "_createAddress", "Address Created and saved to file");
  return currentAddresses[username];
}

export const createAddress = async (_: any, args: CreateAddressArgs, context: any): Promise<Address> => {
  logger(LogLevel.INFO, "createAddress", "Enter resolver");
  const address = await _createAddress(args.username, args.createAddressInput);
  if (address) {
    logger(LogLevel.INFO, "createAddress", "Returning address");
    return address;
  }
  logger(LogLevel.ERROR, "createAddress", "Address creation failed unexpectedly after _createAddress call");
  throw new GraphQLError("Address creation failed unexpectedly");
}