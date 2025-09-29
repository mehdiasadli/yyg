import { faker } from '@faker-js/faker';

const categories = [
  'Supercar',
  'Sports car',
  'Luxury car',
  'SUV',
  'Sedan',
  'Hatchback',
  'Coupe',
  'Convertible',
  'Van',
  'Bus',
  'Off-road',
  'Other',
];

function generateCar() {
  return {
    name: faker.vehicle.vehicle(),
    year: faker.date.past().getFullYear(),
    images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.image.url({
        width: 1000,
      })
    ),
    premium: faker.datatype.boolean(0.2),
    link: `/cars/${faker.vehicle.vehicle().toLowerCase().replace(/ /g, '-')}`,
    category: faker.helpers.arrayElement(categories),
    features: {
      transmission: faker.helpers.arrayElement(['Automatic', 'Manual']),
      fuel: faker.helpers.arrayElement(['Diesel', 'Petrol', 'Electric', 'Hybrid']),
      seats: faker.number.int({ min: 2, max: 8 }),
    },
    contact: {
      name: faker.person.fullName(),
      phone: faker.phone.number({
        style: 'international',
      }),
      whatsapp: faker.phone.number({
        style: 'international',
      }),
    },
    price: {
      daily: {
        km: faker.number.int({ min: 100, max: 500 }),
        amount: faker.number.int({ min: 100, max: 1500 }),
        currency: faker.helpers.arrayElement(['AED', 'USD', 'EUR']),
      },
      weekly: {
        km: faker.number.int({ min: 1000, max: 5000 }),
        amount: faker.number.int({ min: 1000, max: 15000 }),
        currency: faker.helpers.arrayElement(['AED', 'USD', 'EUR']),
      },
      monthly: {
        km: faker.number.int({ min: 2000, max: 10000 }),
        amount: faker.number.int({ min: 2000, max: 15000 }),
        currency: faker.helpers.arrayElement(['AED', 'USD', 'EUR']),
      },
    },
  };
}

const cars = Array.from({ length: 10 }, generateCar);

export default cars;
