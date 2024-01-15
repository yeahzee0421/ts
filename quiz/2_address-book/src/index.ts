interface PhoneNumberDictionary {
  [phone: string]: { //어떤 객체 속성이 들어와도 num: number 
    //여러가지의 key값을 받을 수 있다. 
    num: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

enum PhoneType{
  Home='home',
  Office = 'office',
  Studio = 'studio'
}

// api 함수 정의 by generic
function fetchContacts(): Promise<Contact[]> {
  const contacts: Contact[] = [
    {
      name: 'Tony',
      address: 'Malibu',
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
    {
      name: 'Banner',
      address: 'New York',
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: '마동석',
      address: '서울시 강남구',
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
        },
      },
    },
  ];
  return new Promise(resolve => {
    setTimeout(() => resolve(contacts), 2000);
  });
}

// main
class AddressBook {
  contacts: Contact[] = [];

  constructor() {
    this.fetchData();
  }

  fetchData(): void {
    fetchContacts().then(response => {
      this.contacts = response;
    });
  }

  findContactByName (name: string): Contact[] {
    return this.contacts.filter(contact => contact.name === name);
  }

  findContactByAddress (address: string): Contact[] {
    return this.contacts.filter(contact => contact.address === address);
  }

  findContactByPhone (phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      contact => contact.phones[phoneType].num === phoneNumber
    );
  }
  //enum으로 함수를 사용할 때 input값 메소드화. 
  addContact (contact: Contact): void {
    this.contacts.push(contact);
  }

  displayListByName(): string[] {
    return this.contacts.map(contact => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map(contact => contact.address);
  }
}

new AddressBook();