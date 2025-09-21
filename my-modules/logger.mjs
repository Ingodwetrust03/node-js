import { EventEmitter } from 'node:events';
import fs from 'node:fs/promises';
import path from 'node:path';

export class Logger extends EventEmitter {
  constructor(filename = '', maxSize = 0) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = true;
  }

  //добавляет сообщение в начало logQueue и вызывает метод writeLog, если запись в файл в данный момент не выполняется, устанавливает флаг writing в значение true.

  log = message => {
    this.logQueue.unshift(message);
    this.writeLog(this.filename, this.maxSize, message);
    this.writing = true;

    return this.logQueue;
  };

  //Записывает файл лога из массива logQueue и очищает его. Генерирует событие 'messageLogged'. Вызывает метод проверки размера файла checkFileSize.
  //Если в массиве logQueue есть еще сообщения лога, рекурсивно вызывает метод writeLog.
  //Если в массиве logQueue больше нет сообщений лога, устанавливает флаг writing в значение false.
  writeLog = async (filename, maxSize, message) => {
    try {
      this.logQueue.forEach(el => {
        fs.appendFile(`./logs/${filename}`, `${el}\n`);
      });

      this.logQueue = [];

      this.emit('messageLogged', message);

      this.checkFileSize(this.filename, this.maxSize);

      if (this.logQueue.length === 0) {
        this.writing = false;
      } else {
        this.logQueue.forEach(el => this.writeLog(filename, maxSize, el));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //с помощью fs.stat получает информацию о размере файла и возвращает его размер в байтах. Если возникает ошибка при получении информации о файле, возвращает 0.
  getFileSize = async filename => {
    let fileSize;

    try {
      const data = await fs.stat(`./logs/${filename}`);
      fileSize = data.size;
    } catch (error) {
      console.error('error 0');
    }

    return fileSize;
  };

  //Если текущий размер файла превышает максимальный размер, вызывает метод rotateLog для выполнения ротации лога.

  checkFileSize = async (filename, maxSize) => {
    try {
      let file = await this.getFileSize(filename);

      if (file > +maxSize) {
        this.rotateLog(this.filename, this.maxSize);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Создает резервную копию файла с расширением .bak (копируя текущий лог-файл), затем обрезает текущий лог-файл с помощью метода fs.truncate

  rotateLog = async (filename, maxSize) => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const reserveFileName = `${path.parse(`./logs/${filename}`).name}_copy_${day}-${month}-${year}-${hours}-${minutes}.bak`;

    try {
      let content = await fs.readFile(`./logs/${filename}`, 'utf8');
      await fs.writeFile(`./logs/${reserveFileName}`, content, 'utf8');
      await fs.truncate(`./logs/${filename}`, +maxSize, err => {
        if (err) {
          console.error('Ошибка при усечении файла:', err);
        }
      });
    } catch (error) {
      console.error(`Ощибка при создании резервного файла: ${error}`);
    }
  };
}
