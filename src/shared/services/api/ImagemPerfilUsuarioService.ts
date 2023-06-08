import createApiInstance from "../axios-config";
const Api = createApiInstance();

const createImagemPerfilUsuario = async (file: File): Promise<any> => {
    try {
      const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
      const idUsuario = Number(localStorage.getItem('idUsuario'));
  
      const formData = new FormData();
      formData.append('file', file);
      const url = `/ImagemPerfilUsuario?idUsuario=${idUsuario}`;
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      };
  
      const { data } = await Api.post(url, formData, { headers });
  
      if (data) {
        return data;
      } else {
        throw new Error('Erro ao incluir imagem de perfil do usuário!');
      }
    } catch (error) {
      console.log(error);
      throw new Error((error as { message: string }).message || 'Erro ao incluir imagem de perfil do usuário!');
    }
  }; 

  const getImagemPerfilUsuarioByIdUsuario = async (): Promise<any> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const idUsuario = Number(localStorage.getItem('idUsuario'));
    
        const url = `/ImagemPerfilUsuario/GetByIdUsuario/${idUsuario}`;
    
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
    
        const { data } = await Api.get(url, { headers });
    
        if (data) {
          return data;
        } else {
          throw new Error('Erro ao incluir imagem de perfil do usuário!');
        }
      } catch (error) {
        console.log(error);
        throw new Error((error as { message: string }).message || 'Erro ao incluir imagem de perfil do usuário!');
      }        

  };

export const ImagemPerfilUsuarioService = {
  createImagemPerfilUsuario,
  getImagemPerfilUsuarioByIdUsuario
};
