import os from "os";
import path from "path";

// A tricky way to get access to the old `__dirname` value while using es modules.
const filePath =
    os.platform() === "win32"
        ? // Remove `file:///` on Windows platform, so the file path will start from `C:\\...`.
          import.meta.url.substr(8)
        : // Remove `file://` on other platforms, so the file path will start from `/...`.
          import.meta.url.substr(7);

/**
 * The fully qualified path to the project root directory.
 *
 * @type {string}
 */
export const basePath = path.dirname(filePath);

/**
 * The fully qualified path to the project locales directory.
 *
 * @type {string}
 */
export const localesPath = path.join(basePath, "locales");
