import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function optimize() {
  const publicDir = './public';
  
  const files = [
    { name: 'logo-site.png', width: 120, format: 'webp' },
    { name: 'pagamentos.png', width: 600, format: 'webp' },
  ];

  for (const file of files) {
    const inputPath = path.join(publicDir, file.name);
    try {
      await fs.access(inputPath);
      const parsed = path.parse(file.name);
      const outputPath = path.join(publicDir, `${parsed.name}.${file.format}`);
      
      let img = sharp(inputPath);
      if (file.width) img = img.resize({ width: file.width });
      
      if (file.format === 'webp') {
        img = img.webp({ quality: 80 });
      }
      
      await img.toFile(outputPath);
      console.log(`Optimized ${file.name} -> ${path.basename(outputPath)}`);
    } catch (e) {
      console.log(`Skipping ${file.name}: ${e.message}`);
    }
  }
}

optimize();
