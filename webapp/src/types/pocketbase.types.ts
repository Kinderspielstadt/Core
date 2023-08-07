/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Accounts = "accounts",
	AccountsData = "accountsData",
	AccountsList = "accountsList",
	Colors = "colors",
	Polls = "polls",
	Settings = "settings",
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
	accountNumber?: string
	picture?: string
	firstName: string
	lastName: string
	color?: RecordIdString
	lastCheckIn?: IsoDateString
	personalData?: RecordIdString
}

export type AccountsDataRecord = {
	birthday?: IsoDateString
	email?: string
	firstNameParent?: string
	lastNameParent?: string
	street?: string
	zipCode?: number
	city?: string
	phone?: string
	intolerances?: string
	vegetarian?: boolean
	oneweek?: boolean
}

export type AccountsListRecord<Tbalance = unknown, Tname = unknown> = {
	accountNumber?: string
	picture?: string
	name?: null | Tname
	color: string
	lastCheckIn?: IsoDateString
	balance?: null | Tbalance
	vegetarian?: boolean
}

export type ColorsRecord = {
	hex: string
}

export enum PollsOptionOptions {
	"A" = "A",
	"B" = "B",
	"C" = "C",
	"D" = "D",
}
export type PollsRecord = {
	accountNumber: string
	option: PollsOptionOptions
}

export type SettingsRecord = {
	radioUrl?: string
}

export type TransactionsRecord = {
	account: RecordIdString
	label: string
	amount?: number
}

// Response types include system fields and match responses from the PocketBase API
export type AccountsResponse<Texpand = unknown> = Required<AccountsRecord> & BaseSystemFields<Texpand>
export type AccountsDataResponse<Texpand = unknown> = Required<AccountsDataRecord> & BaseSystemFields<Texpand>
export type AccountsListResponse<Tbalance = unknown, Tname = unknown, Texpand = unknown> = Required<AccountsListRecord<Tbalance, Tname>> & BaseSystemFields<Texpand>
export type ColorsResponse<Texpand = unknown> = Required<ColorsRecord> & BaseSystemFields<Texpand>
export type PollsResponse<Texpand = unknown> = Required<PollsRecord> & BaseSystemFields<Texpand>
export type SettingsResponse<Texpand = unknown> = Required<SettingsRecord> & BaseSystemFields<Texpand>
export type TransactionsResponse<Texpand = unknown> = Required<TransactionsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	accounts: AccountsRecord
	accountsData: AccountsDataRecord
	accountsList: AccountsListRecord
	colors: ColorsRecord
	polls: PollsRecord
	settings: SettingsRecord
	transactions: TransactionsRecord
}

export type CollectionResponses = {
	accounts: AccountsResponse
	accountsData: AccountsDataResponse
	accountsList: AccountsListResponse
	colors: ColorsResponse
	polls: PollsResponse
	settings: SettingsResponse
	transactions: TransactionsResponse
}