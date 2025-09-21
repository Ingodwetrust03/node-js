import { copyPaste } from './my-modules/copy-directories.mjs';
import { Logger } from './my-modules/logger.mjs';

// копирование / вставка директорий и файлов
copyPaste('./sourceDir', './targetDir');

// логирование
const logger = new Logger('log.txt', 80);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');
logger.log('Второе сообщение');
