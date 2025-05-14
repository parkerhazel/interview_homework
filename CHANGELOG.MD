# Changelog

## [Ticket-1]

## Task
- Update the address schema to include a "state" field.
    - Update typescript types to mirror schema types

### Updates
+ Added field state with type String to Address src/schema/address/address.graphql
+ Added field state with type string? to Address in src/schema/address/types.ts
    * Needed to add the ? operater because the state doesn't currently exists in the data and is therefore optional upon return
    * Do I need to add this for the other fields since they aren't technically required as well? (Went ahead and did b/c ticket sub reqts. Would probably have clarified this if given the chance though.)


## [Ticket-2]

## Task
- Create a mutation that accepts a username and address and saves it to the addresses.json file.
    - Follow the same pattern already in place in the "address" resolver
    - Add types where appropriate (graph and ts)
    - This is a create, not an update or delete. Don't smash existing records.
    - You can use any library or tool to modify the addresses.json file. If you use a library and it has a "get" or "read" function update the "address" resolver to use the same toolset to retrieve records.

## Updates
+ Added input CreateAddressInput to src/schema/address/address.graphql. We are creating, not upserting.
    * Made all fields req'd because that makes sense. Would have clarified.
+ Added new type createAddressInput to typescript types.
    * Included all relevant fields and their types.
    * Note that state is not optional in this new type, because we want to collect this data going forward.
+ Added new type createAddressArgs to typescript types.
    * This will be used for arguments of the mutation once we create it.
+ Added createAddress Mutation to src/schema/schema.graphql.
    * Arguments username and createAddressInput are req'd because we need them to create a new address.
+ Created new _createAddress method to create a new address with a given username and address input data.
    * Because we are doing create only & not upserting, I had the method check if the given username already had an address. It throws an error if so. It's not currently within scope, but this could be solved by updating the schema to allow a username to have multiple addresses.
+ Created new createAddress method to create a new address based off username and addressInput from mutation input.
    * Added logging and handling to match pattern already in place.
+ Created createAddress Mutation in resolvers.ts for creating the address under a given username.
    * It accepts the createAddressArgs and returns an Address.
+ Forgot to add functionality for updating addresses.json file. Added that to pull and push data out of the file.
    * Instealled jsonfile to interact with the file.
    * Needed to update all methods to be asyncronous b/c the way jsonfile interacted with the file req'd it.
    * Added spaces when recreating the json file to make it easier to read
+ Updated resolvers in resolvers.ts file to be asyncronous as well to work with methods in address.ts
