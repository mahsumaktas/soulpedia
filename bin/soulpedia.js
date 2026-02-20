#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Yardımcı Renk Fonksiyonları
const red = (str) => `\x1b[31m${str}\x1b[0m`;
const green = (str) => `\x1b[32m${str}\x1b[0m`;
const yellow = (str) => `\x1b[33m${str}\x1b[0m`;
const blue = (str) => `\x1b[34m${str}\x1b[0m`;

const REPO_URL = 'https://raw.githubusercontent.com/mahsumaktas/soulpedia/main/souls';

program
  .name('soulpedia')
  .description('Yapay zeka asistanları için soul (persona) yönetim aracı')
  .version('0.0.1');

program
  .command('list')
  .description('Mevcut tüm soulları listele')
  .action(async () => {
    console.log(blue('Mevcut soullar GitHub üzerinden veya lokalden listelenebilir (Gelecek versiyonda API entegrasyonu yapılacak).'));
    console.log(`- tough-mentor\n- socrates\n- the-architect\n- paranoid-secops\n- the-minimalist`);
  });

program
  .command('install <soul-name>')
  .description("Belirtilen soul'u indirir ve ilgili yapay zeka ayar dosyasına (CLAUDE.md vb.) ekler.")
  .option('-t, --target <tool>', 'Hedef araç (ör: claude, gemini, cursor)', 'claude')
  .action(async (soulName, options) => {
    console.log(yellow(`⏳ "${soulName}" ruhu (soul) indiriliyor...`));
    
    try {
      let soul;
      const localFilePath = path.join(process.cwd(), 'souls', `${soulName}.yml`);
      
      if (fs.existsSync(localFilePath)) {
        console.log(blue('ℹ️ Yerel klasörden okunuyor...'));
        const yamlText = fs.readFileSync(localFilePath, 'utf8');
        soul = yaml.load(yamlText);
      } else {
        const response = await fetch(`${REPO_URL}/${soulName}.yml`);
        if (!response.ok) {
          throw new Error(`Soul bulunamadı: ${soulName}. (Status: ${response.status})`);
        }
        const yamlText = await response.text();
        soul = yaml.load(yamlText);
      }

      console.log(green(`✅ Soul başarıyla indirildi: ${soul.name} ${soul.emoji}`));

      // Metni oluştur
      let finalPrompt = `\n---\n# Soul Enjekte Edildi: ${soul.name} ${soul.emoji}\n`;
      finalPrompt += `## Kimlik ve Görev:\n${soul.prompt}\n`;
      
      if (soul.tone && soul.tone.length > 0) {
        finalPrompt += `## İletişim Tonu:\n- ${soul.tone.join('\n- ')}\n`;
      }
      if (soul.bans && soul.bans.length > 0) {
        finalPrompt += `## Kesin Yasaklar (Bans):\n- ${soul.bans.join('\n- ')}\n`;
      }
      if (soul.memory_injections && soul.memory_injections.length > 0) {
        finalPrompt += `## Hafıza ve İnançlar:\n- ${soul.memory_injections.join('\n- ')}\n`;
      }
      finalPrompt += `---\n`;

      // Hedef Dosyayı belirle
      let targetFile = 'CLAUDE.md';
      if (options.target === 'gemini') targetFile = 'GEMINI.md';
      else if (options.target === 'cursor') targetFile = '.cursorrules';

      const filePath = path.join(process.cwd(), targetFile);
      
      // Dosyaya ekleme yap
      if (fs.existsSync(filePath)) {
        fs.appendFileSync(filePath, finalPrompt);
        console.log(green(`🎉 Başarılı! "${soul.name}" ruhu mevcut ${targetFile} dosyasına eklendi.`));
      } else {
        fs.writeFileSync(filePath, finalPrompt);
        console.log(green(`🎉 Başarılı! Yeni ${targetFile} dosyası oluşturuldu ve "${soul.name}" ruhu içine eklendi.`));
      }

    } catch (error) {
      console.error(red(`❌ Hata: ${error.message}`));
    }
  });

program.parse(process.argv);