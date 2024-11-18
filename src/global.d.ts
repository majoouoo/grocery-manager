interface Item {
	name: string;
	category: string;
	categoryIsCustom: boolean;
	location: string;
	locationIsCustom: boolean;
	quantity: number | null;
	quantityUnit: string;
	expDate: Date | null;
	boughtDate: Date | null;
}

interface Filters {
	group: keyof Item;
	sort: keyof Item;
}
