# Interactive Fractal Tree Generator

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?logo=next.js)](https://nextjs.org)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.5.0-blue?logo=react)](https://ui.shadcn.com)
[![Bun](https://img.shields.io/badge/Bun-1.0.0-ff69b4?logo=bun)](https://bun.sh)

An interactive fractal tree visualization that grows with each click, built with Next.js 15 and Shadcn UI components.

![Fractal Tree Preview](./public/screenshot.png)

## Features

- 🌳 Interactive fractal tree generation
- 💧 Click-based growth mechanism
- 🎨 Dynamic color gradients based on depth
- 📱 Responsive canvas rendering
- 🌿 Beautiful UI with smooth animations
- 🔄 Auto-adjusting to screen size
- 📈 Progressive complexity limit (up to 10 levels)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Shadcn UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Language**: TypeScript

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fractal-tree.git
   cd fractal-tree
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run the development server**
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Scripts

- `bun dev`: Start development server
- `bun build`: Create production build
- `bun start`: Start production server
- `bun lint`: Run ESLint

## Project Structure

```
/src
├── app
│   └── page.tsx          # Main page
├── components
│   └── fractal-tree.tsx # Core tree component
│   └── ui               # Shadcn UI components
/public
│   └── screenshot.png   # Project screenshot
```

## Customization

Modify the fractal behavior in `components/fractal-tree.tsx`:
```typescript
// Change growth limit (default: 10)
setDepth(prev => Math.min(prev + 1, 10))

// Adjust initial branch length (default: 80)
drawTree(ctx, canvas.width / 2, canvas.height, 80, ...)

// Modify color gradient (HSL values)
ctx.strokeStyle = `hsl(${(depth / maxDepth) * 120}, 70%, 50%)`
```

## License

MIT License - see [LICENSE](LICENSE) for details.
