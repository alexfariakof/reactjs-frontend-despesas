import { Categorias } from '../src/pages/Categorias';
import React, { ReactComponentElement } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AppThemeProvider } from '../src/shared/contexts';
import { Delete, Edit } from '@mui/icons-material';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));


describe('Categorias Component', () => {
  let renderedComponent: React.ReactElement<any, string >;
  
  beforeEach(() => {
    renderedComponent = <AppThemeProvider ><Categorias /></AppThemeProvider >;
  });

  it('renders without errors', () => {
    render(renderedComponent);    
    
  });

  it('handles input change correctly', () => {
    render(renderedComponent);
    const descricaoInput = screen.getByTestId('descricao');

    fireEvent.change(descricaoInput, { target: { value: 'New Description' } });

    expect(descricaoInput).toHaveTextContent('New Description');
  });

  it('handles TipoCategoria change correctly', () => {
    render(renderedComponent);
    const tipoCategoriaSelect = screen.getByLabelText('Tipo de Categoria');

    fireEvent.change(tipoCategoriaSelect, { target: { value: '1' } });

    expect(tipoCategoriaSelect).toHaveValue('1');
  });

  it('calls handleSave when save button is clicked', () => {
    // Mock a function to replace the actual handleSave function
    const mockHandleSave = jest.fn();
    
    render(renderedComponent);
    const saveButton = screen.getByText('Salvar');

    fireEvent.click(saveButton);

    // Verifica se a função handleSave foi chamada quando o botão foi clicado
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('calls handleEdit when edit button is clicked', () => {
    // Mock a function to replace the actual handleEdit function
    const mockHandleEdit = jest.fn();

    render(renderedComponent);
    const editButton = screen.getByTestId('Edit');

    fireEvent.click(editButton);

    // Verifica se a função handleEdit foi chamada quando o botão foi clicado
    expect(mockHandleEdit).toHaveBeenCalled();
  });

  it('calls handleDelete when delete button is clicked', () => {
    // Mock a function to replace the actual handleDelete function
    const mockHandleDelete = jest.fn();

    render(renderedComponent);
    const deleteButton = screen.getByTestId('delete');

    fireEvent.click(deleteButton);

    // Verifica se a função handleDelete foi chamada quando o botão foi clicado
    expect(mockHandleDelete).toHaveBeenCalled();
  });

  // Adicione mais casos de teste para cobrir outras funcionalidades e caminhos de código do componente.
});