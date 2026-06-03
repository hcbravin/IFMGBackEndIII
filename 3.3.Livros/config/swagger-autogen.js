const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Livros',
    version: '1.0.0',
    description: 'API REST para gerenciamento de livros e empréstimos'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    // Modelo completo de Livro (com categoria)
    LivroCompleto: {
      id: 1,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      status: 'disponivel',
      categoria_id: 1,
      criada_em: '2026-06-03T10:00:00.000Z',
      atualizada_em: '2026-06-03T10:00:00.000Z',
      categoria: {
        id: 1,
        nome: 'Romance'
      }
    },
    
    // Modelo para criar novo livro (todos obrigatórios exceto status)
    NovoLivro: {
      $titulo: 'Dom Casmurro',
      $autor: 'Machado de Assis',
      $categoria_id: 1,
      status: 'disponivel'  // opcional, padrão é 'disponivel'
    },
    
    // Modelo para atualizar livro (todos opcionais)
    AtualizarLivro: {
      titulo: 'Dom Casmurro (Edição Especial)',
      autor: 'Machado de Assis',
      categoria_id: 1,
      status: 'emprestado'
    }
  }
};

const outputFile = './config/swagger_output.json';
const endpointsFiles = [
  './routes/rotasIndex.js',
  './routes/rotasLivros.js',    // ← seu arquivo de rotas de livros
  './routes/rotasCategorias.js'  // ← seu arquivo de rotas de categorias
];

swaggerAutogen(outputFile, endpointsFiles, doc);