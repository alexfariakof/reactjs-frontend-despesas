import { ImagemPerfilUsuario } from "../../models";
import createApiInstance from "../axios-config";

const Api = createApiInstance();
const endPoint = '/Usuario/ImagemPerfil';
const headers = {
  'Content-Type': 'multipart/form-data',
};

const getImagemPerfilUsuarioByIdUsuario = async (): Promise<ImagemPerfilUsuario | any> => {
  try {
    const { data } = await Api.get(endPoint);
    if (data)  return data;
    else return null;
  }
  catch {
    return null;
  }
};

const createImagemPerfilUsuario = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await Api.post<ImagemPerfilUsuario>(endPoint, formData, { headers: headers });
    if (data)  return data as ImagemPerfilUsuario;

  }
  catch (error) {
    return error;
  }
};

const updateImagemPerfilUsuario = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await Api.put<ImagemPerfilUsuario>(endPoint, formData, { headers: headers });
    if (data) return data as ImagemPerfilUsuario;
  }
  catch (error) {
    return error;
  }
};

const deleteImagemPerfilUsuario = async (): Promise<any> => {
  try {
    const { data } = await Api.delete(endPoint);
    if (data) return data;
  }
  catch (error) {
    return error;
  }
};

export const ImagemPerfilUsuarioService = {
  getImagemPerfilUsuarioByIdUsuario,
  createImagemPerfilUsuario,
  updateImagemPerfilUsuario,
  deleteImagemPerfilUsuario
};