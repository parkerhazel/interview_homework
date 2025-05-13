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