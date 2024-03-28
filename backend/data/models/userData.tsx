interface userData {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    address: Address[];
    avatar: Avatar;
    createdAt: Date;
}

interface Address {
    country: string;
    city: string;
    address: string;
    zipCode: number;
    addressType: string;
}

interface Avatar {
    public_id: string;
    url: string;
}