import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC_ASSETS = path.resolve('src/assets');
const PUBLIC_DIR = path.resolve('public');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

async function convertImagesInDir(dir, outputDir = dir) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      await convertImagesInDir(filePath, outputDir);
      continue;
    }
    
    const ext = path.extname(file);
    if (!IMAGE_EXTENSIONS.includes(ext)) continue;
    
    const baseName = path.basename(file, ext);
    const outputFileName = `${baseName}.webp`;
    const outputPath = path.join(outputDir, outputFileName);
    
    try {
      await sharp(filePath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      const originalSize = stat.size;
      const newStat = await fs.stat(outputPath);
      const savings = ((originalSize - newStat.size) / originalSize * 100).toFixed(1);
      
      console.log(`✓ Converted: ${file} -> ${outputFileName} (${savings}% smaller)`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  }
}

async function main() {
  console.log('Converting images in src/assets...');
  await convertImagesInDir(SRC_ASSETS);
  
  console.log('\nConverting images in public/...');
  await convertImagesInDir(PUBLIC_DIR);
  
  console.log('\nImage conversion complete!');
}

main().catch(console.error);