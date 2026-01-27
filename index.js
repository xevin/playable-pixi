#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Получаем имя проекта из аргументов командной строки
const projectName = process.argv[2];

if (!projectName) {
  console.error('Ошибка: укажите имя проекта. Пример: npm create my-template my-project');
  process.exit(1);
}

// Пути
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
const templateDir = path.resolve(__dirname, 'template');

// Создаем папку проекта
if (fs.existsSync(projectDir)) {
  console.error(`Ошибка: папка "${projectName}" уже существует.`);
  process.exit(1);
}
fs.mkdirSync(projectDir, { recursive: true });

// Копируем файлы из шаблона
fs.cpSync(templateDir, projectDir, { recursive: true });

// Пример: переименовываем .gitignore (если в шаблоне он назван gitignore)
try {
  fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
  );
} catch (err) {
  // Игнорируем, если файла нет
}

// Устанавливаем зависимости (если есть package.json)
if (fs.existsSync(path.join(projectDir, 'package.json'))) {
  console.log('Устанавливаю зависимости...');
  execSync('npm install', { stdio: 'inherit', cwd: projectDir });
}

console.log(`Проект "${projectName}" создан успешно!`);
console.log(`Перейдите в папку: cd ${projectName}`);

