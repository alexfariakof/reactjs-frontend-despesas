import { ImagemPerfilUsuarioVM } from "../../interfaces";
import createApiInstance from "../axios-config";

const Api = createApiInstance();
const endPoint = '/ImagemPerfilUsuario';

const getImagemPerfilUsuarioByIdUsuario = async (): Promise<ImagemPerfilUsuarioVM | any> => {
  try {
    const { data } = await Api.get(endPoint);
    if (data.message === true) {
      return data.imagemPerfilUsuario;
    } else {
      return null;
    }
  }
  catch {
    return null;
  }
};

const createImagemPerfilUsuario = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await Api.post(endPoint);

    if (data) {
      return data;
    }
  }
  catch (error) {
    return { message: 'Erro ao incluir imagem de perfil do usuário!' };
  }
};

const updateImagemPerfilUsuario = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await Api.put(endPoint);

    if (data) {
      return data;
    } else {
      throw new Error();
    }
  }
  catch {
    return { message: 'Erro ao alterar imagem de perfil do usuário!' };
  }
};

const deleteImagemPerfilUsuario = async (): Promise<any> => {
  try {
    const { data } = await Api.delete(endPoint);

    if (data) {
      return data;
    } else {
      throw new Error();
    }
  }
  catch (error) {
    return { message: 'Erro ao deletar imagem de perfil do usuário!' };
  }
};

export const ImagemPerfilUsuarioService = {
  getImagemPerfilUsuarioByIdUsuario,
  createImagemPerfilUsuario,
  updateImagemPerfilUsuario,
  deleteImagemPerfilUsuario
};