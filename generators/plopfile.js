module.exports = (plop) => {
  // Gerador para controlador
  plop.setGenerator('controller', {
    description: 'Create a controller for a model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome do model (ex. User, Aviso):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/controllers/{{pascalCase name}}Controller.ts',
        templateFile: 'templates/regularController.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/repositories/{{pascalCase name}}Repository.ts',
        templateFile: 'templates/regularRepository.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/routes/{{pascalCase name}}Routes.ts',
        templateFile: 'templates/regularRoutes.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/DTOs/{{pascalCase name}}.ts',
        templateFile: 'templates/regularDTO.ts.hbs',
      },
    ],
  });
};
