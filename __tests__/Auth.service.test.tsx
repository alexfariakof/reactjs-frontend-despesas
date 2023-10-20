
import { environment } from "../src/shared/environment";
import { AuthService,  ControleAcessoVM, LoginVM} from "../src/shared/services/api/auth/AuthService";
import MockAdapter from 'axios-mock-adapter';
import createApiInstance from "../src/shared/services/axios-config";
import axios from "axios";

const mockApi = new MockAdapter(createApiInstance());
const urlBase  = environment.URL_BASE;
const axiosInstance = axios.create({
  // Your default axios configuration here
  baseURL: 'http://example.com',
  // ... other options
});

// Set the options
const options = {
  maxRedirects: 21,
  maxBodyLength: 10485760,
  protocol: 'http:',
  path: '/api/ControleAcesso/SignIn',
  method: 'POST',
  headers: {
    // Your custom headers here
  },
  // ... other options
};

// Create a new instance of MockAdapter with the provided options
const mock = new MockAdapter(axiosInstance, options);

describe('AuthService', () => {
    afterEach(() => {
        mockApi.reset()

    })
    afterAll(()=>{
        mockApi.restore()
    })

  it('should call auth and return data', async () => {
    const mockData = { email: 'teste@teste.com', senha: 'teste' };
    mockApi.onPost(environment.URL_BASE + '/ControleAcesso/SignIn').replyOnce(200, mockData).onAny().passThrough();
    const spy = jest.spyOn(AuthService, 'auth');

    const email = 'teste@teste.com';
    const password = 'teste';
    const result = await AuthService.auth(email, password);
    expect(result.data).not.toBeNull();
    console.log(result.data);
    //expect(result.data).toEqual(mockData);
    spy.mockClear();
  });

});
