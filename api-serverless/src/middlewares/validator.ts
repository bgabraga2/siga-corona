import createError from "http-errors"
import Ajv from "ajv"
import ajvKeywords from "ajv-keywords"
import ajvLocalize from "ajv-i18n"
import ajvErrors from "ajv-errors"
import { deepStrictEqual } from "assert"

let ajv
let previousConstructorOptions
const defaults = {
  v5: true,
  coerceTypes: 'array', // important for query string params
  allErrors: true,
  useDefaults: true,
  $data: true, // required for ajv-keywords
  defaultLanguage: 'en',
  jsonPointers: true
}

const availableLanguages = Object.keys(ajvLocalize)

/* in ajv-i18n Portuguese is represented as pt-BR */
const languageNormalizationMap = {
  'pt': 'pt-BR',
  'pt-br': 'pt-BR',
  'pt_BR': 'pt-BR',
  'pt_br': 'pt-BR'
}

const normalizePreferredLanguage = (lang) => languageNormalizationMap[lang] || lang

const chooseLanguage = ({ preferredLanguage }, defaultLanguage) => {
  if (preferredLanguage) {
    const lang = normalizePreferredLanguage(preferredLanguage)
    if (availableLanguages.includes(lang)) {
      return lang
    }
  }

  return defaultLanguage
}

export const validator = ({ inputSchema, outputSchema, ajvOptions }: any) => {
  const options = Object.assign({}, defaults, ajvOptions)
  lazyLoadAjv(options)

  const validateInput = inputSchema ? ajv.compile(inputSchema) : null
  const validateOutput = outputSchema ? ajv.compile(outputSchema) : null

  return {
    before (handler, next) {
      if (!inputSchema) {
        return next()
      }
      const valid = validateInput(handler.event)

      if (!valid) {
        const error = new createError.BadRequest('Requisição inválida')
        handler.event.headers = Object.assign({}, handler.event.headers)
        const language = chooseLanguage(handler.event, options.defaultLanguage)
        ajvLocalize[language](validateInput.errors)

        error.customMessage = error.message
        error.details = validateInput.errors
        throw error
      }

      return next()
    },
    after (handler, next) {
      if (!outputSchema || (!handler.response && handler.error)) {
        return next()
      }
      const valid = validateOutput(handler.response)

      if (!valid) {
        const error = new createError.InternalServerError('Response object failed validation')
        error.customMessage = error.message
        error.details = validateOutput.errors
        error.response = handler.response
        throw error
      }
      return next()
    }
  }
}

function lazyLoadAjv (options) {
  if (shouldInitAjv(options)) {
    initAjv(options)
  }

  return ajv
}

function shouldInitAjv (options) {
  return !ajv || areConstructorOptionsNew(options)
}

function areConstructorOptionsNew (options) {
  try {
    deepStrictEqual(options, previousConstructorOptions)
  } catch (e) {
    return true
  }

  return false
}

function initAjv (options) {
  ajv = new Ajv(options)
  ajvKeywords(ajv)
  ajvErrors(ajv)
  previousConstructorOptions = options
}