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

/**
 * Переименовывает все файлы в корне указанной директории,
 * которые начинаются с символа '_', заменяя '_' на '.'.
 * @param {string} dirPath - путь к директории
 */
function renameUnderscoreFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && file.name.startsWith('_')) {
        const newName = '.' + file.name.slice(1);
        const oldPath = path.join(dirPath, file.name);
        const newPath = path.join(dirPath, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Переименован: ${file.name} -> ${newName}`);
      }
    }
  } catch (err) {
    // Игнорируем ошибки (например, если директории не существует)
  }
}

// Переименовываем все файлы, начинающиеся с '_'
renameUnderscoreFiles(projectDir);

// Устанавливаем зависимости (если есть package.json)
if (fs.existsSync(path.join(projectDir, 'package.json'))) {
  console.log('Устанавливаю зависимости...');
  execSync('npm install', { stdio: 'inherit', cwd: projectDir });
}

console.log(`Проект "${projectName}" создан успешно!`);
console.log(`Перейдите в папку: cd ${projectName}`);

