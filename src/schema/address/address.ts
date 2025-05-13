import * as addressTable from "../../../data/addresses.json";
import { Addresses, Address, Args } from "./types";
import { logger, LogLevel } from "../../utils";
import { GraphQLError } from "graphql";
const addresses = addressTable as Addresses;

const _getAddress = (username: string): Address | null => {
  return addresses[username];
};

export const getAddress = (_: any, args: Args, context: any): Address => {
  logger(LogLevel.INFO, "getAddress", "Enter resolver");
  const address = _getAddress(args.username);
  if (address) {
    logger(LogLevel.INFO, "getAddress", "Returning address");
    return address;
  }
  logger(LogLevel.ERROR, "getAddress", "No address found");
  throw new GraphQLError("No address found in getAddress resolver");
};
