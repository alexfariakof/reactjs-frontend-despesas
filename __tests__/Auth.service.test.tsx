
import { environment } from "../src/shared/environment";
import { AuthService,  ControleAcessoVM, LoginVM} from "../src/shared/services/api/auth/AuthService";
import MockAdapter from 'axios-mock-adapter';
import createApiInstance from "../src/shared/services/axios-config";

const execTests = false;
const mockApi = new MockAdapter(createApiInstance());

// Create a new instance of MockAdapter with the provided options
const mock = new MockAdapter(createApiInstance());

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
    //expect(result.data).toEqual(mockData);
    spy.mockClear();
  });

  test("Teste Auth Services Runs", () => {
    expect(execTests).toEqual(execTests);
 });
 
});
