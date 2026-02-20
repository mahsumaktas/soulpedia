#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const inquirer = require('inquirer');

// Yardımcı Renk Fonksiyonları
const red = (str) => `\x1b[31m${str}\x1b[0m`;
const green = (str) => `\x1b[32m${str}\x1b[0m`;
const yellow = (str) => `\x1b[33m${str}\x1b[0m`;
const blue = (str) => `\x1b[34m${str}\x1b[0m`;
const dim = (str) => `\x1b[2m${str}\x1b[0m`;

// Varsayılan API URL'i (Yayına giren Vercel projenizin adresi)
const API_URL = 'https://soulpedia.vercel.app/api/souls';
const REPO_URL = 'https://raw.githubusercontent.com/mahsumaktas/soulpedia/main/souls';

// Hedef Araçlar (Targets) ve Dosya Yolları
const TARGETS = {
  claude: 'CLAUDE.md',
  gemini: 'GEMINI.md',
  cursor: '.cursorrules',
  windsurf: '.windsurfrules',
  copilot: '.github/copilot-instructions.md'
};

program
  .name('soulpedia')
  .description('Yapay zeka asistanları için gelişmiş persona (soul) yönetim aracı')
  .version('0.1.0');

// Yardımcı: API'den Veri Çekme
async function fetchFromApi(endpoint = '') {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(yellow('⚠️ API bağlantısı sağlanamadı. Lütfen internet bağlantınızı kontrol edin.'));
    return null;
  }
}

// 1. LIST KOMUTU
program
  .command('list')
  .description('Sistemde bulunan tüm ruhları (souls) listeler.')
  .action(async () => {
    console.log(dim('⏳ Soulpedia kütüphanesine bağlanılıyor...'));
    const res = await fetchFromApi();
    
    if (res && res.data) {
      console.log(blue(`\n📚 Toplam ${res.count} ruh bulundu:\n`));
      res.data.forEach(s => {
        console.log(` ${s.emoji}  ${green(s.name)} ${dim(`(${s.id})`)}`);
        console.log(`    ${dim(s.description)}\n`);
      });
    }
  });

// 2. SEARCH KOMUTU
program
  .command('search <query>')
  .description('Anahtar kelime ile ruhları arar.')
  .action(async (query) => {
    console.log(dim(`⏳ "${query}" için arama yapılıyor...`));
    const res = await fetchFromApi(`?search=${encodeURIComponent(query)}`);
    
    if (res && res.data && res.data.length > 0) {
      console.log(green(`\n🔍 Arama sonuçları (${res.count}):\n`));
      res.data.forEach(s => {
        console.log(` ${s.emoji}  ${blue(s.name)} ${dim(`(${s.id})`)}`);
        console.log(`    ${dim(s.description)}\n`);
      });
    } else {
      console.log(red(`\n👻 "${query}" ile eşleşen bir ruh bulunamadı.\n`));
    }
  });

// 3. INSTALL KOMUTU
program
  .command('install <soul-name>')
  .description('Belirtilen ruhu indirir ve interaktif olarak projenize entegre eder.')
  .option('-t, --target <tool>', 'Hedef araç (claude, gemini, cursor, windsurf, copilot)', 'claude')
  .action(async (soulName, options) => {
    console.log(dim(`⏳ "${soulName}" ruhu indiriliyor...`));
    
    let soul;
    
    // 1. Önce lokalden (Geliştirici ortamı için) okumayı dene
    const localFilePath = path.join(process.cwd(), 'souls', `${soulName}.yml`);
    if (fs.existsSync(localFilePath)) {
      console.log(blue('ℹ️ Yerel klasörden (lokal) okunuyor...'));
      const yamlText = fs.readFileSync(localFilePath, 'utf8');
      soul = yaml.load(yamlText);
    } else {
      // 2. API'den veya Github'dan çek (API fallback)
      const res = await fetchFromApi(`/${soulName}`);
      if (res && res.data) {
        soul = res.data;
      } else {
        // En kötü senaryoda Github Raw'dan çek
        const ghRes = await fetch(`${REPO_URL}/${soulName}.yml`);
        if (!ghRes.ok) {
          console.error(red(`\n❌ Hata: "${soulName}" adında bir ruh bulunamadı.\n`));
          process.exit(1);
        }
        const yamlText = await ghRes.text();
        soul = yaml.load(yamlText);
      }
    }

    console.log(green(`✅ Ruh başarıyla bağlandı: ${soul.emoji} ${soul.name}`));

    // DİNAMİK DEĞİŞKENLER (VARIABLES) İÇİN SORULAR (INQUIRER)
    const answers = {};
    if (soul.variables && soul.variables.length > 0) {
      console.log(blue(`\n📝 Bu ruhun düzgün çalışması için bazı bilgilere ihtiyacı var:`));
      
      const prompts = soul.variables.map(variable => ({
        type: 'input',
        name: variable,
        message: `${variable.replace(/_/g, ' ').toUpperCase()} nedir?:`
      }));
      
      const userInputs = await inquirer.prompt(prompts);
      Object.assign(answers, userInputs);
    }

    // Metinleri Derle ve Değişkenleri Değiştir
    let compiledPrompt = soul.prompt;
    let compiledTone = soul.tone ? soul.tone.join('\n- ') : '';
    let compiledBans = soul.bans ? soul.bans.join('\n- ') : '';
    let compiledMemory = soul.memory_injections ? soul.memory_injections.join('\n- ') : '';

    // Kullanıcının girdiği cevapları {{degisken}} formatında değiştir
    for (const [key, value] of Object.entries(answers)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      compiledPrompt = compiledPrompt.replace(regex, value);
      compiledTone = compiledTone.replace(regex, value);
      compiledBans = compiledBans.replace(regex, value);
      compiledMemory = compiledMemory.replace(regex, value);
    }

    // GÖMME İŞLEMİ (START / END MARKERS - Silme komutu için çok önemli)
    const START_MARKER = `<!-- SOULPEDIA START: ${soul.id} -->`;
    const END_MARKER = `<!-- SOULPEDIA END: ${soul.id} -->`;

    let finalPrompt = `\n${START_MARKER}\n`;
    finalPrompt += `# AI PERSONA: ${soul.name} ${soul.emoji}\n\n`;
    finalPrompt += `## Identity & Goal:\n${compiledPrompt}\n`;
    
    if (compiledTone) finalPrompt += `\n## Communication Tone:\n- ${compiledTone}\n`;
    if (compiledBans) finalPrompt += `\n## Strict Bans:\n- ${compiledBans}\n`;
    if (compiledMemory) finalPrompt += `\n## Core Beliefs (Memory Injections):\n- ${compiledMemory}\n`;
    
    finalPrompt += `${END_MARKER}\n`;

    // Hedef Dosyayı belirle
    const targetFile = TARGETS[options.target.toLowerCase()];
    if (!targetFile) {
      console.error(red(`❌ Hata: "${options.target}" desteklenmeyen bir araç. Desteklenenler: ${Object.keys(TARGETS).join(', ')}`));
      process.exit(1);
    }

    const filePath = path.join(process.cwd(), targetFile);
    
    // Eğer copilot gibi alt klasördeyse (.github/...) klasörün var olduğundan emin ol
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Dosyaya ekleme yap (Eğer aynı ruh zaten varsa uyarı ver)
    let fileContent = '';
    if (fs.existsSync(filePath)) {
      fileContent = fs.readFileSync(filePath, 'utf8');
      if (fileContent.includes(START_MARKER)) {
        console.log(yellow(`\n⚠️ Uyarı: "${soul.name}" ruhu zaten ${targetFile} dosyasında mevcut. Önce 'remove' komutunu kullanın veya elle silin.\n`));
        process.exit(0);
      }
    }

    fs.appendFileSync(filePath, finalPrompt);
    console.log(green(`\n🎉 BAŞARILI! "${soul.name}" ruhu ${targetFile} dosyasına enjekte edildi.\n`));
  });

// 4. REMOVE KOMUTU
program
  .command('remove <soul-name>')
  .description('Enjekte edilmiş bir ruhu projeden (ayar dosyasından) temizler.')
  .option('-t, --target <tool>', 'Hedef araç (claude, gemini, cursor, windsurf, copilot)', 'claude')
  .action((soulName, options) => {
    const targetFile = TARGETS[options.target.toLowerCase()];
    if (!targetFile) {
      console.error(red(`❌ Hata: "${options.target}" desteklenmeyen bir araç.`));
      process.exit(1);
    }

    const filePath = path.join(process.cwd(), targetFile);
    if (!fs.existsSync(filePath)) {
      console.log(yellow(`\n⚠️ "${targetFile}" dosyası bulunamadı. Silinecek bir şey yok.\n`));
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const START_MARKER = `<!-- SOULPEDIA START: ${soulName} -->`;
    const END_MARKER = `<!-- SOULPEDIA END: ${soulName} -->`;

    if (!content.includes(START_MARKER)) {
      console.log(yellow(`\n⚠️ Bu dosyada "${soulName}" ruhuna ait bir iz bulunamadı.\n`));
      return;
    }

    // Başlangıç ve Bitiş markerları arasındaki (kendileri dahil) her şeyi silen Regex
    const regex = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}\\n?`, 'g');
    const newContent = content.replace(regex, '');

    fs.writeFileSync(filePath, newContent);
    console.log(green(`\n🧹 BAŞARILI! "${soulName}" ruhu ${targetFile} dosyasından tamamen temizlendi.\n`));
  });

// 5. CREATE KOMUTU (Sıfırdan Ruh Yaratma Sihirbazı)
program
  .command('create <soul-id>')
  .description('Sıfırdan yepyeni bir ruh (YAML dosyası) tasarlamak için kurulum sihirbazını başlatır.')
  .action(async (soulId) => {
    console.log(blue(`\n🧙‍♂️ "${soulId}" için Soulpedia Ruh Yaratma Sihirbazı'na Hoş Geldiniz!\n`));
    
    const answers = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Ruhun (Persona) görünen adı ne olacak?:' },
      { type: 'input', name: 'emoji', message: 'Ruh için tek bir emoji seçin (Örn: 🤖):', default: '🤖' },
      { type: 'input', name: 'description', message: 'Ne işe yaradığını kısaca açıklayın (1 cümle):' },
      { type: 'input', name: 'category', message: 'Kategorisi nedir? (Coding, Mentor, Architecture vs.):', default: 'General' },
      { type: 'input', name: 'author', message: 'Yazar adı (Github kullanıcı adınız):' },
      { type: 'editor', name: 'prompt', message: 'System Prompt (Temel Görev/Kimlik metni) girin:' }
    ]);

    const yamlObj = {
      id: soulId,
      name: answers.name,
      emoji: answers.emoji,
      description: answers.description,
      category: answers.category,
      tools: ['Claude Code', 'Gemini CLI', 'Cursor'],
      author: answers.author,
      version: "1.0",
      prompt: answers.prompt,
      tone: ["Example Tone 1", "Example Tone 2"],
      bans: ["Example Ban (Never do X)"],
      memory_injections: ["Example Core Belief 1"],
      variables: []
    };

    const yamlString = yaml.dump(yamlObj, { lineWidth: -1 });
    
    // Klasör kontrolü
    const soulsDir = path.join(process.cwd(), 'souls');
    if (!fs.existsSync(soulsDir)) {
      fs.mkdirSync(soulsDir, { recursive: true });
    }

    const filePath = path.join(soulsDir, `${soulId}.yml`);
    if (fs.existsSync(filePath)) {
      console.log(red(`\n❌ Hata: "${soulId}.yml" dosyası zaten var.\n`));
      process.exit(1);
    }

    fs.writeFileSync(filePath, yamlString);
    console.log(green(`\n🎉 MUHTEŞEM! Yeni ruhun iskeleti "${filePath}" adresinde başarıyla oluşturuldu.`));
    console.log(yellow(`\n👉 Şimdi gidip bu dosyayı açın; 'tone', 'bans' ve 'memory_injections' gibi detaylı kısımları kendi vizyonunuza göre doldurun.\n`));
  });

program.parse(process.argv);