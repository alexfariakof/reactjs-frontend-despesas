#!/bin/bash

# Pasta onde o relatório será gerado
reportPath="./coverage/lcov-report"

# Executa o testes unitários e gera Relatório Coverage
npm run test:coverage

# Encontra o diretório mais recente na pasta TestResults
latestDir=$(ls -td $reportPath/* | head -n 1)

# Verifica se encontrou um diretório e, em caso afirmativo, obtém o nome do diretório (GUID)
if [ -n "$latestDir" ]; then

    # Abre a página index.html no navegador padrão do sistema operacional (navegador web padrão no Linux)
    start $reportPath/index.html
else
    echo "Nenhum diretório de resultados encontrado."
fi