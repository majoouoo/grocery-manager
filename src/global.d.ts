interface Item {
	name: string;
	category: string;
	location: string;
	quantity: number | null;
	quantityUnit: string;
	expDate: Date | null;
	boughtDate: Date | null;
	consumeWithin: number | null;
}

interface Filters {
	group: keyof Item;
	sort: keyof Item;
}
