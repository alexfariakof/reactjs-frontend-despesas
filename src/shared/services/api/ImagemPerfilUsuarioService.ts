import createApiInstance from "../axios-config";
const Api = createApiInstance();
export interface ImagemPerfilUsuarioVM {
  id: number;
  url: string;
  name: string;
  type: string;
  contentType: string;
  idUsuario: number;
}

const getImagemPerfilUsuarioByIdUsuario = async (): Promise<ImagemPerfilUsuarioVM | any> => {
  try {
    const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    const url = `/ImagemPerfilUsuario/GetByIdUsuario/${idUsuario}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };

    const { data } = await Api.get(url, { headers });

    if (data.message === true) {
      return data.imagemPerfilUsuario;
    } else {
      return null;
    }
  }
  catch (error) {
    return null;
  }
};

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
    }
  } 
  catch (error) {
    console.log(error);
  }
};

const updateImagemPerfilUsuario = async (file: File): Promise<any> => {
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

    const { data } = await Api.put(url, formData, { headers });

    if (data) {
      return data;
    } else {
      throw new Error('Erro ao alterar imagem de perfil do usuário!');
    }
  } 
  catch (error) {
    console.log(error);
  }
};

const deleteImagemPerfilUsuario = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    const url = `/ImagemPerfilUsuario/${idUsuario}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };

    const { data } = await Api.delete(url, { headers });

    if (data) {
      return data;
    } else {
      throw new Error('Erro ao alterar imagem de perfil do usuário!');
    }
  } 
  catch (error) {
    console.log(error);
  }
};

export const ImagemPerfilUsuarioService = {
  getImagemPerfilUsuarioByIdUsuario,
  createImagemPerfilUsuario,
  updateImagemPerfilUsuario,
  deleteImagemPerfilUsuario
};