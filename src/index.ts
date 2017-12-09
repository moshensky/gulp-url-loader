import * as through from 'through2'
import { PluginError } from 'gulp-util'
import { resolve, dirname } from 'path'
import { Transform } from 'stream'
import { getType } from 'mime'
import { readFileSync } from 'fs'

const mkError = (msg: string) => new PluginError('gulp-url-loader', msg)

export const re = /import(?:\s+|\s+\*\s+as\s+)(\w+)\s+from\s+('|")(.+(?:png|gif|jpe?g))\2/g

const inline = (content: string, fileFolderPath: string) =>
  content.replace(re, (_: string, variableName: string, __: string, imgRelativePath: string) => {
    const mimeType = getType(imgRelativePath)
    const fullPath = resolve(fileFolderPath, imgRelativePath)
    const encodedData = readFileSync(fullPath).toString('base64')
    return `const ${variableName} = 'data:${mimeType};base64,${encodedData}'`
  })

export const urlLoader = (): Transform => {
  return through.obj((file, _, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      cb(mkError('Streaming not supported'))
    }

    if (file.isBuffer()) {
      const fileFolder = dirname(file.path)
      const content = inline(file.contents.toString(), fileFolder)
      file.contents = new Buffer(content)
    }

    cb(null, file)
  })
}
