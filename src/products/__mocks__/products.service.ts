const mockFindAll = jest.fn().mockReturnValue([
  {
    name: 'test',
    price: 10,
    description: 'descripcion',
    stock: 1,
    storeId: 1,
    id: 1,
  },
  {
    name: 'test 1',
    price: 10,
    description: 'descripcion 1',
    stock: 1,
    storeId: 1,
    id: 2,
  },
]);

const mockCreate = jest.fn().mockReturnValue({
  name: 'test',
  price: 10,
  description: 'descripcion',
  stock: 1,
  storeId: 1,
  id: 1,
});

const mockFindOne = jest.fn().mockReturnValue({
  name: 'test',
  price: 10,
  description: 'descripcion',
  stock: 1,
  storeId: 1,
  id: 1,
});

const mockUpdate = jest.fn().mockReturnValue({
  name: 'test',
  price: 10,
  description: 'descripcion',
  stock: 1,
  storeId: 1,
  id: 1
});

const mockRemove = jest.fn().mockReturnValue(undefined);

export const ProductsService = jest.fn().mockReturnValue({
  create: mockCreate,
  findAll: mockFindAll,
  findOne: mockFindOne,
  update: mockUpdate,
  remove: mockRemove,
});
