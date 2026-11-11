import { promises as fs } from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const PUBLIC_DIR = path.resolve('public');

const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.MOV', '.MP4', '.webm', '.WEBM'];

function convertVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libvpx-vp9',
        '-crf 30',
        '-b:v 0',
        '-c:a libopus',
        '-b:a 128k',
        '-deadline good',
        '-cpu-used 4',
        '-threads 4',
        '-tile-columns 6',
        '-frame-parallel 1',
        '-auto-alt-ref 1',
        '-lag-in-frames 25',
        '-g 240',
      ])
      .output(outputPath)
      .on('end', () => {
        console.log(`✓ Converted video: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`✗ Failed to convert ${inputPath}:`, err.message);
        reject(err);
      })
      .run();
  });
}

async function convertVideosInDir(dir) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      await convertVideosInDir(filePath);
      continue;
    }
    
    const ext = path.extname(file);
    if (!VIDEO_EXTENSIONS.includes(ext)) continue;
    
    // Skip if already webm
    if (ext.toLowerCase() === '.webm') {
      console.log(`⏭ Skipping (already WebM): ${file}`);
      continue;
    }
    
    const baseName = path.basename(file, ext);
    const outputFileName = `${baseName}.webm`;
    const outputPath = path.join(dir, outputFileName);
    
    try {
      await convertVideo(filePath, outputPath);
    } catch (error) {
      // Error already logged in convertVideo
    }
  }
}

async function main() {
  console.log('Converting videos in public/...');
  await convertVideosInDir(PUBLIC_DIR);
  console.log('\nVideo conversion complete!');
}

main().catch(console.error);