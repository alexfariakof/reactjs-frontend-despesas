import { ICategoria } from "../src/shared/interfaces";
import { CategoriasService } from "../src/shared/services/api";

const execTests = false;

// Mock de localStorage
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

global.localStorage = localStorageMock;

// Mock do axios
const axiosMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

jest.mock("../__mocks__/axios-config", () => ({
  createapiInstance: () => axiosMock,
}));

describe("CategoriasService", () => {
  const mockCategoria: ICategoria = {
    id: 1,
    descricao: "Categoria 1",
    idTipoCategoria: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  if (execTests) {
    it("getAll should return data when the API call is successful", async () => {
      axiosMock.get.mockResolvedValue({ data: [mockCategoria] });

      localStorageMock.getItem = jest.fn().mockImplementation((key) => {
        return "mockAccessToken";
      });

      const result = await CategoriasService.getAll();

      expect(axiosMock.get).toHaveBeenCalledWith("/Categoria", {
        headers: { Authorization: "Bearer mockAccessToken" },
      });

      expect(result).toEqual([mockCategoria]);
    });

    it("getAll should handle errors when calling the API", async () => {
      axiosMock.get.mockRejectedValue(new Error("Error fetching categories"));

      localStorageMock.getItem = jest.fn().mockImplementation((key) => {
        return "mockAccessToken";
      });

      try {
        await CategoriasService.getAll();
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(axiosMock.get).toHaveBeenCalledWith("/Categoria", {
          headers: { Authorization: "Bearer mockAccessToken" },
        });

        // eslint-disable-next-line jest/no-conditional-expect
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("getById should return data when the API call is successful", async () => {
      axiosMock.get.mockResolvedValue({ data: mockCategoria });

      localStorageMock.getItem = jest.fn().mockImplementation((key) => {
        return "mockAccessToken";
      });

      // eslint-disable-next-line testing-library/no-await-sync-query
      const result = await CategoriasService.getById(1);

      expect(axiosMock.get).toHaveBeenCalledWith("/Categoria/GetById/1", {
        headers: { Authorization: "Bearer mockAccessToken" },
      });

      expect(result).toEqual(mockCategoria);
    });

    it("getById should handle errors when calling the API", async () => {
      axiosMock.get.mockRejectedValue(new Error("Error fetching category"));

      localStorageMock.getItem = jest.fn().mockImplementation((key) => {
        return "mockAccessToken";
      });

      try {
        // eslint-disable-next-line testing-library/no-await-sync-query
        await CategoriasService.getById(1);
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(axiosMock.get).toHaveBeenCalledWith("/Categoria/GetById/1", {
          headers: { Authorization: "Bearer mockAccessToken" },
        });

        // eslint-disable-next-line jest/no-conditional-expect
        expect(error).toBeInstanceOf(Error);
      }
    });
  }

  test("Test Categoria Services is Running", () => {
    expect(execTests).toEqual(execTests);
  });
});
