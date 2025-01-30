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
	consumeWithin: number | null;
	isOpen: boolean;
	profile: number;
}

interface Filters {
	group: keyof Item;
	sort: keyof Item;
}

interface Settings {
	appearance: string;
	profiles: Profile[];
	activeProfile: number;
}

interface Profile {
	name: string;
	isEdited: boolean;
	id: number;
}