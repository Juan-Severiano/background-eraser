<p align="center">
  <img src="./public/vite.svg" width="100" alt="Logo do Background Eraser">
</p>

<h1 align="center">Background Eraser</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  Remova o fundo de imagens instantaneamente, direto no seu navegador. 100% Gratuito, Privado e Sem limites.
</p>

## Sobre o Projeto

Este projeto é um clone open-source funcional do **remove.bg**, focado em privacidade e simplicidade. Diferente de outros serviços que requerem upload para um servidor, o **Background Eraser** processa todas as imagens localmente no seu navegador utilizando WebAssembly e a biblioteca `@imgly/background-removal`.

Isso significa que suas fotos nunca saem do seu dispositivo.

## ✨ Funcionalidades

*   🔒 **100% Client-Side**: Nenhuma imagem é enviada para servidores externos.
*   ⚡ **Rápido e Responsivo**: Interface fluida, arraste e solte, funcionando em Desktop e Mobile.
*   🎨 **Design Premium**: Inspirado na estética clean e moderna, com tema "White & Rose".
*   📥 **Alta Qualidade**: Download das imagens processadas em resolução total (HD).
*   🛠 **Editor Integrado**: Visualização clara do resultado com fundo transparente (checkerboard).

## 🚀 Tecnologias

Este projeto foi desenvolvido com as tecnologias mais modernas do ecossistema React:

*   **[React](https://react.dev/)**: Biblioteca para construção de interfaces.
*   **[Vite](https://vitejs.dev/)**: Build tool ultrarrápida.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de estilização utility-first.
*   **[@imgly/background-removal](https://github.com/imgly/background-removal-js)**: O motor de IA que faz a mágica acontecer.
*   **[Lucide React](https://lucide.dev/)**: Ícones belos e consistentes.

## 📦 Como Usar

Para rodar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

*   Node.js instalado (versão 18+ recomendada)
*   PNPM (ou NPM/Yarn)

### Instalação

Clonando o repositório:

```bash
git clone https://github.com/Juan-Severiano/background-eraser.git
cd background-eraser
```

Instalando as dependências:

```bash
pnpm install
```

### Rodando o Projeto

```bash
pnpm dev
```

O servidor iniciará em `http://localhost:5173`.
> **Nota**: A primeira vez que você processar uma imagem, o navegador fará o download dos modelos de IA (~100MB), o que pode levar alguns instantes. Os usos subsequentes serão muito mais rápidos devido ao cache.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1.  Faça um Fork do projeto
2.  Crie sua Feature Branch (`git checkout -b feature/MinhaFeature`)
3.  Commit suas mudanças (`git commit -m 'Adiciona: MinhaFeature'`)
4.  Push para a Branch (`git push origin feature/MinhaFeature`)
5.  Abra um Pull Request

## Autor

| [<img src="https://github.com/Juan-Severiano.png" width="100"><br><sub>@Juan-Severiano</sub>](https://github.com/Juan-Severiano) |
| :---: |

---
