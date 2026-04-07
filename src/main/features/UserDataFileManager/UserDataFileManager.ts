import { app } from "electron";
import { access, readFile, writeFile } from "fs/promises";
import * as path from "path";

/**
 * Класс для работы с файлами пользовательских данных
 */
export class UserDataFileManager<T = unknown> {
  private filePath: string;

  constructor(fileName: string, defaultData?: T) {
    const userDataPath = app.getPath("userData");
    this.filePath = path.join(userDataPath, fileName);

    // Инициализируем файл при создании экземпляра
    this.initializeFile(defaultData).catch(console.error);
  }

  /**
   * Инициализирует файл: создаёт, если не существует, с данными по умолчанию
   * @param defaultData Значения по умолчанию
   */
  private async initializeFile(defaultData?: unknown): Promise<void> {
    try {
      await access(this.filePath);
    } catch {
      // Файл не существует — создаём с данными по умолчанию или пустым объектом
      const dataToWrite = defaultData !== undefined ? defaultData : {};
      await this.writeData(dataToWrite as T);
    }
  }

  /**
   * Записывает данные в файл, перезаписывая всё содержимое
   * @param data Данные для записи (тип unknown)
   */
  async writeData(data: T, disableHumanReadable = false): Promise<void> {
    try {
      const jsonString = JSON.stringify(
        data,
        null,
        !disableHumanReadable ? 2 : undefined,
      );
      await writeFile(this.filePath, jsonString, "utf-8");
    } catch (error) {
      throw new Error(`Ошибка при записи в файл ${this.filePath}: ${error}`);
    }
  }

  /**
   * Чтение данных из файла
   */
  async readData(): Promise<T> {
    try {
      const fileContent = await readFile(this.filePath, "utf-8");
      return JSON.parse(fileContent) as T;
    } catch (error) {
      throw new Error(`Error read data from file ${this.filePath}: ${error}`);
    }
  }

  /**
   * Чтение данных из файла и возвращение в виде JSON строки
   * @returns JSON строка
   */
  async readDataAsJSON(): Promise<string> {
    try {
      return await readFile(this.filePath, "utf-8");
    } catch (error) {
      throw new Error(`Error read data from file ${this.filePath}: ${error}`);
    }
  }
}
