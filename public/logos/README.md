# Logo Files

Place your logo files here.

## Supported Formats
- `.png` (recommended for photos)
- `.svg` (recommended for logos - scalable)
- `.jpg` / `.jpeg`
- `.webp` (modern, smaller file size)

## File Naming
- `logo.png` or `logo.svg` - Main logo file
- The component will reference it as `/logos/logo.png` or `/logos/logo.svg`

## Current Placeholder
- `logo.svg` - A simple placeholder logo (heart/icon design)
- Replace this file with your actual logo

## Usage in Code
```tsx
import Image from 'next/image';

<Image 
  src="/logos/logo.png"  // or logo.svg
  alt="Rite Path Logo" 
  width={40} 
  height={40}
/>
```

