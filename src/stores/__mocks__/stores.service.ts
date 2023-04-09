import { Store } from '../entities/store.entity';

const mockFindAll = jest.fn().mockReturnValue([
  {
    name: 'test local',
    address: 'direccion local test',
    phone: '+584126029910',
    id: 1,
    products: null,
  },
  {
    name: 'test local',
    address: 'direccion local test',
    phone: '+584126029910',
    id: 2,
    products: null,
  },
]);

const mockCreate = jest.fn().mockReturnValue({
  name: 'test local',
  address: 'direccion local test',
  phone: '+584126029910',
  id: 1,
  products: null,
});

const mockFindOne = jest.fn().mockReturnValue({
  name: 'test local',
  address: 'direccion local test',
  phone: '+584126029910',
  id: 1,
  products: null,
});

const mockUpdate = jest.fn().mockReturnValue({
  name: 'test local',
  address: 'direccion local test',
  phone: '+584126029910',
  id: 1,
  products: null,
});

const mockRemove = jest.fn().mockReturnValue(undefined);

export const StoresService = jest.fn().mockReturnValue({
  create: mockCreate,
  findAll: mockFindAll,
  findOne: mockFindOne,
  update: mockUpdate,
  remove: mockRemove,
});
