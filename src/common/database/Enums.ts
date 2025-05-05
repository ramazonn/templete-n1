enum Roles {
	SUPER_ADMIN = "super_admin", // has access all routes
	STOCK_KEEPER = "stock_keeper", // has access all routes
	BICHUVCHI = "bichuvchi",
	SEWER = "sewer",
	IRONER = "ironer",
	CLEANER = "cleaner",
	CONTROLLER = "controller",
	ACCOUNTANT = "accountant",
}

enum PaymentType {
	CASH = "cash",
	CARD = "card",
	DEBT = "debt",
}

enum ProductType {
	KG = "kg",
	PCS = "pcs",
	M = "metr",
}

enum BalanceLogType {
	PAY_OFF = "pay_off",
	WITHDRAW = "withdraw",
}
enum ClothesSize {
	M = "M",
	S = "S",
	X = "X",
	L = "L",
	XL = "XL",
	XXL = "2XL",
	XXXL = "3XL",
	XXXXL = "4XL",
	XXXXXL = "5XL",
}
enum ProduceCycleStatus {
	BICHUV = "bichuv",
	SEWING = "sewing",
	IRONING = "ironing",
	CLEANING = "cleaning",
	CONTROL = "control",
}

enum ReadyOrderProductSort {
	FIRST = "1st",
	SECOND = "2nd",
}

enum ReadyOrderStatus {
	READY = "ready",
	INCOMPLETE = "incomplete",
	ARCHIVE = "archive",
}

enum SalaryType {
	FIXED = "fixed",
	WORK_BY = "work_by",
}
export {
	Roles,
	PaymentType,
	ProductType,
	ClothesSize,
	BalanceLogType,
	ProduceCycleStatus,
	ReadyOrderProductSort,
	ReadyOrderStatus,
	SalaryType,
};
