export type Address = {
  street?: string;
  city?: string;
  zipcode?: string;
  state?: string;
};

export type Addresses = {
  [key: string]: Address;
};

export type Args = {
  username: string;
};

export type CreateAddressInput = {
  street: string;
  city: string;
  zipcode: string;
  state: string;
};

export type CreateAddressArgs = {
  username: string;
  createAddressInput: CreateAddressInput;
};