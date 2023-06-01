/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Accounts = "accounts",
	AccountsData = "accountsData",
	AccountsList = "accountsList",
	Transactions = "transactions",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AccountsRecord = {
	accountNumber: string
	firstName: string
	lastName: string
	lastCheckIn?: IsoDateString
	personalData: RecordIdString
}

export type AccountsDataRecord = {
	birthday: IsoDateString
	email: string
	firstNameParent: string
	lastNameParent: string
	street: string
	zipCode: number
	city: string
	phone: string
}

export type AccountsListRecord<Tbalance = unknown, Tname = unknown> = {
	accountNumber: string
	name?: null | Tname
	lastCheckIn?: IsoDateString
	balance?: null | Tbalance
}

export type TransactionsRecord = {
	account: RecordIdString
	label: string
	amount?: number
}

// Response types include system fields and match responses from the PocketBase API
export type AccountsResponse<Texpand = unknown> = Required<AccountsRecord> & BaseSystemFields<Texpand>
export type AccountsDataResponse = Required<AccountsDataRecord> & BaseSystemFields
export type AccountsListResponse<Tbalance = unknown, Tname = unknown> = Required<AccountsListRecord<Tbalance, Tname>> & BaseSystemFields
export type TransactionsResponse<Texpand = unknown> = Required<TransactionsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	accounts: AccountsRecord
	accountsData: AccountsDataRecord
	accountsList: AccountsListRecord
	transactions: TransactionsRecord
}

export type CollectionResponses = {
	accounts: AccountsResponse
	accountsData: AccountsDataResponse
	accountsList: AccountsListResponse
	transactions: TransactionsResponse
}