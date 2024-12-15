# Stage: Development
FROM node:18 AS dev

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Установка pnpm глобально
RUN npm install -g pnpm

# Копируем только необходимые для установки зависимостей файлы
COPY pnpm-lock.yaml ./
COPY package.json ./

# Удаление папки node_modules (если она существует) для предотвращения конфликтов
RUN rm -rf node_modules

# Установка зависимостей с помощью pnpm
RUN pnpm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Удаляем node_modules из приложения, если они случайно были скопированы
RUN rm -rf ./node_modules && pnpm install

# Открываем порт для dev-сервера
EXPOSE 3000

# Команда для запуска dev-режима
CMD ["pnpm", "dev", "--host"]
