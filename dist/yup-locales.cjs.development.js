'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// https://github.com/jquense/yup/blob/3ad94724dc23175dd4378ac64c3d5396bebc52f2/src/util/printValue.js
var toString = Object.prototype.toString;
var errorToString = Error.prototype.toString;
var regExpToString = RegExp.prototype.toString;
var symbolToString = typeof Symbol !== 'undefined' ? Symbol.prototype.toString : function () {
  return '';
};
var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;

function printNumber(val) {
  if (val !== +val) return 'NaN';
  var isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? '-0' : '' + val;
}

function printSimpleValue(val, quoteStrings) {
  if (quoteStrings === void 0) {
    quoteStrings = false;
  }

  if (val === null || val === true || val === false) return '' + val;
  var typeOf = typeof val;
  if (typeOf === 'number') return printNumber(val);
  if (typeOf === 'string') return quoteStrings ? "\"" + val + "\"" : val;
  if (typeOf === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
  if (typeOf === 'symbol') return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  var tag = toString.call(val).slice(8, -1);
  if (tag === 'Date') return isNaN(val.getTime()) ? '' + val : val.toISOString(val);
  if (tag === 'Error' || val instanceof Error) return '[' + errorToString.call(val) + ']';
  if (tag === 'RegExp') return regExpToString.call(val);
  return null;
}

function printValue(value, quoteStrings) {
  var result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function (key, value) {
    var result = printSimpleValue(this[key], quoteStrings);
    if (result !== null) return result;
    return value;
  }, 2);
}

/*eslint-disable no-template-curly-in-string*/

var mixed = {
  "default": '${path} غير صالح.',
  required: '${path} هو حقل مطلوب',
  oneOf: '${path} يجب أن تكون واحدة من القيم التالية: ${values}',
  notOneOf: '${path} لا يجب أن تكون واحدة من القيم التالية: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 `" + type + "` \u0646\u0648\u0639, " + ("\u0648\u0644\u0643\u0646 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 \u0643\u0627\u0646\u062A \u0641\u064A: `" + printValue(value, true) + "`") + (isCast ? " (\u0627\u0644\u0645\u062F\u0644\u0649 \u0628\u0647\u0627 \u0645\u0646 \u0642\u064A\u0645\u0629 `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n \u0625\u0630\u0627 \u0643\u0627\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u062F \"\u0644\u0627\u063A\u064A\u0629\" \u0643\u0642\u064A\u0645\u0629 \u0641\u0627\u0631\u063A\u0629 \u0645\u0645\u0627 \u0644\u0627 \u0634\u0643 \u0641\u064A\u0647 \u0644\u0644\u0627\u062D\u062A\u0641\u0627\u0644 \u0645\u062E\u0637\u0637 \u0643\u0645\u0627" + ' `.nullable()`';
    }

    return msg;
  }
};
var string = {
  length: '${path} يجب أن يكون بالضبط ${length} حرفا',
  min: '${path} يجب أن تكون على الأقل ${min} حرفا',
  max: '${path} يجب أن تكون على الأكثر ${max} حرفا',
  matches: '${path} يجب أن يطابق ما يلي: "${regex}"',
  email: '${path} يجب أن يكون عنوان بريد إلكتروني صالح',
  url: '${path} يجب أن يكون عنوان URL صالحا',
  trim: '${path} يجب أن تكون سلسلة قلص',
  lowercase: '${path} يجب أن تكون سلسلة صغيرة',
  uppercase: '${path} يجب أن تكون سلسلة الحالة العلوي'
};
var number = {
  min: '${path} يجب أن تكون أكبر من أو يساوي ${min}',
  max: '${path} يجب أن يكون أقل من أو يساوي ${max}',
  lessThan: '${path} يجب أن يكون أقل من ${less}',
  moreThan: '${path} يجب أن تكون أكبر من ${more}',
  positive: '${path} يجب أن يكون رقما موجبا',
  negative: '${path} يجب أن يكون رقما سالبا',
  integer: '${path} يجب أن يكون رقما'
};
var date = {
  min: '${path} يجب أن يكون حقل في وقت لاحق من ${min}',
  max: '${path} يجب أن يكون حقل في وقت سابق من ${max}'
};
var _boolean = {};
var object = {
  noUnknown: '${path} حقل لا يمكن أن يكون مفاتيح غير محددة في شكل وجوه'
};
var array = {
  min: 'يجب أن يكون ${path} حقل على الأقل ${min} من العناصر',
  max: '${path} يجب أن يكون الحقل أقل من أو يساوي إلى ${max} من العناصر'
};

var ar = {
  __proto__: null,
  mixed: mixed,
  string: string,
  number: number,
  date: date,
  boolean: _boolean,
  object: object,
  array: array
};

/*eslint-disable no-template-curly-in-string*/

var mixed$1 = {
  "default": '${path} ist ungültig',
  required: '${path} ist ein Pflichtfeld',
  oneOf: '${path} muss einem der folgenden Werte entsprechen: ${values}',
  notOneOf: '${path} darf keinem der folgenden Werte entsprechen: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " muss vom Typ `" + type + "` sein, " + ("aber der Wert war: `" + printValue(value, true) + "`") + (isCast ? " (gecastet aus dem Wert `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Wenn \"null\" als leerer Wert gedacht ist, m\xFCssen Sie das Schema als `.nullable()` markieren.";
    }

    return msg;
  }
};
var string$1 = {
  length: '${path} muss genau ${length} Zeichen lang sein',
  min: '${path} muss mindestens ${min} Zeichen lang sein',
  max: '${path} darf höchstens ${max} Zeichen lang sein',
  matches: '${path} muss wie folgt aussehen: "${regex}"',
  email: '${path} muss eine gültige E-Mail-Adresse enthalten',
  url: '${path} muss eine gültige URL sein',
  trim: '${path} darf keine Leerzeichen am Anfang oder Ende enthalten',
  lowercase: '${path} darf nur Kleinschreibung enthalten',
  uppercase: '${path} darf nur Großschreibung enthalten'
};
var number$1 = {
  min: '${path} muss größer oder gleich ${min} sein',
  max: '${path} muss kleiner oder gleich ${max} sein',
  lessThan: '${path} muss kleiner sein als ${less}',
  moreThan: '${path} muss größer sein als ${more}',
  positive: '${path} muss eine positive Zahl sein',
  negative: '${path} muss eine negative Zahl sein',
  integer: '${path} muss eine ganze Zahl sein'
};
var date$1 = {
  min: '${path} muss später sein als ${min}',
  max: '${path} muss früher sein als ${max}'
};
var _boolean$1 = {};
var object$1 = {
  noUnknown: '${path}-Feld darf keine Schlüssel verwenden, die nicht im "Objekt-Shape" definiert wurden'
};
var array$1 = {
  min: '${path}-Feld muss mindesten ${min} Einträge haben',
  max: '${path}-Feld darf höchstens ${max} Einträge haben'
};

var de = {
  __proto__: null,
  mixed: mixed$1,
  string: string$1,
  number: number$1,
  date: date$1,
  boolean: _boolean$1,
  object: object$1,
  array: array$1
};

/*eslint-disable no-template-curly-in-string*/

var mixed$2 = {
  "default": '${path} no es válido.',
  required: '${path} es un campo obligatorio',
  oneOf: '${path} debe ser uno de los siguientes valores: ${values}',
  notOneOf: '${path} no debe ser uno de los siguientes valores: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " debe ser un `" + type + "` Tipo, " + ("pero el valor final fue: `" + printValue(value, true) + "`") + (isCast ? " (Obtenido del valor `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Si \"nulo\" es intencionalmente un valor vac\xEDo, aseg\xFArese de marcar el esquema como" + ' `.nullable()`';
    }

    return msg;
  }
};
var string$2 = {
  length: '${path} debe ser exactamente ${length} caracteres',
  min: '${path} debe ser de al menos ${min} caracteres',
  max: '${path} debe ser como máximo ${max} caracteres',
  matches: '${path} debe coincidir con lo siguiente: "${regex}"',
  email: '${path} debe ser un correo electrónico válido',
  url: '${path} debe ser una URL válida',
  trim: '${path} debe ser una cadena recortada',
  lowercase: '${path} debe ser una cadena en minúsculas',
  uppercase: '${path} debe ser una cadena en mayúsculas'
};
var number$2 = {
  min: '${path} debe ser mayor que o igual a ${min}',
  max: '${path} debe ser menor que o igual a ${max}',
  lessThan: '${path} debe ser menor a ${less}',
  moreThan: '${path} debe ser mayor a ${more}',
  positive: '${path} debe ser un número positivo',
  negative: '${path} debe ser un número negativo',
  integer: '${path} debe ser un entero'
};
var date$2 = {
  min: '${path} campo debe ser posterior a ${min}',
  max: '${path} campo debe ser anterior a ${max}'
};
var _boolean$2 = {};
var object$2 = {
  noUnknown: '${path} campo tiene llaves no especificadas en el objeto'
};
var array$2 = {
  min: '${path} campo debe tener al menos ${min} artículos',
  max: '${path} campo debe ser menor o igual a ${max} artículos'
};

var es = {
  __proto__: null,
  mixed: mixed$2,
  string: string$2,
  number: number$2,
  date: date$2,
  boolean: _boolean$2,
  object: object$2,
  array: array$2
};

/*eslint-disable no-template-curly-in-string*/

var mixed$3 = {
  "default": '${path} est invalide.',
  required: '${path} est un champ obligatoire',
  oneOf: "${path} doit être l'une des valeurs suivantes : ${values}",
  notOneOf: "${path} ne doit pas être l'une des valeurs suivantes : ${values}",
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " doit \xEAtre un type `" + type + "`, " + ("mais la valeur finale \xE9tait: `" + printValue(value, true) + "`") + (isCast ? " (coul\xE9e de la valeur `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Si \xAB null \xBB est con\xE7ue comme une valeur vide assurez-vous de marquer le sch\xE9ma comme" + ' `.nullable()`';
    }

    return msg;
  }
};
var string$3 = {
  length: '${path} doit être exactement ${length} caractères',
  min: '${path} doit être au moins ${min} caractères',
  max: '${path} doit être au plus ${max} caractères',
  matches: '${path} doit correspondre à ce qui suit : "${regex}"',
  email: '${path} doit être un email valide',
  url: '${path} doit être une URL valide',
  trim: '${path} doit être une chaîne garnie',
  lowercase: '${path} doit être une chaîne en minuscule',
  uppercase: '${path} doit être une chaîne de majuscules'
};
var number$3 = {
  min: '${path} doit être supérieure ou égale à ${min}',
  max: '${path} doit être inférieur ou égal à ${max}',
  lessThan: '${path} doit être inférieure à ${less}',
  moreThan: '${path} doit être supérieure à ${more}',
  positive: '${path} doit être un nombre positif',
  negative: '${path} doit être un nombre négatif',
  integer: '${path} doit être un entier'
};
var date$3 = {
  min: '${path} champ doit être au plus tard ${min}',
  max: 'champ ${path} doit être au plus tôt ${max}'
};
var _boolean$3 = {};
var object$3 = {
  noUnknown: "champ ${path} ne peut pas avoir des clés non spécifiées dans la forme de l'objet"
};
var array$3 = {
  min: 'champ ${path} doit avoir au moins ${min} articles',
  max: '${path} champ doit avoir inférieur ou égal à ${max} articles'
};

var fr = {
  __proto__: null,
  mixed: mixed$3,
  string: string$3,
  number: number$3,
  date: date$3,
  boolean: _boolean$3,
  object: object$3,
  array: array$3
};

var mixed$4 = {
  "default": '${path} לא קיים או לא תקין',
  required: '${path} הינו שדה חובה',
  oneOf: 'על ${path} להיות מהערכים הבאים: ${values}',
  notOneOf: 'אסור ${path} להיות מהערכים הבאים: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05E1\u05D5\u05D2 `" + type + "`, " + ("\u05D0\u05D1\u05DC \u05D4\u05EA\u05E7\u05D1\u05DC: `" + printValue(value, true) + "`") + (isCast ? " (cast from the value `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n If \"null\" is intended as an empty value be sure to mark the schema as `.nullable()`";
    }

    return msg;
  }
};
var string$4 = {
  length: '${path} חייב להכיל ${length} תווים בדיוק',
  min: '${path} חייב להכיל לפחות ${min} תווים',
  max: '${path} חייב להכיל פחות מ${max} תווים',
  matches: '${path} חייב להיות זהה ל: "${regex}"',
  email: '${path} צריך להיות מייל חוקי',
  url: '${path} צריך להיות כתובת חוקית',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string'
};
var number$4 = {
  min: '${path} חייב להיות גדול או שווה ל ${min}',
  max: '${path}חייב להיות קטן או שווה ל ${max}',
  lessThan: '${path} חייב להיות קטן מ ${less}',
  moreThan: '${path} חייב להיות גדול מ ${more}',
  positive: '${path} מוכרח להיות חיובי',
  negative: '${path} מוכרח להיות שלילי',
  integer: '${path} חייב להיות מספר שלם'
};
var date$4 = {
  min: '${path} צריך להיות אחרי ${min}',
  max: '${path} צריך להיות לפני ${max}'
};
var _boolean$4 = {};
var object$4 = {
  noUnknown: '${path} חייב להכיל את התבנית הספציפית של אובייקט התבנית'
};
var array$4 = {
  min: '${path} צריך להכיל לפחות ${min} פריטים',
  max: '${path} צריך להכיל פחות מ ${max} פריטים'
};

var he = {
  __proto__: null,
  mixed: mixed$4,
  string: string$4,
  number: number$4,
  date: date$4,
  boolean: _boolean$4,
  object: object$4,
  array: array$4
};

/*eslint-disable no-template-curly-in-string*/

var mixed$5 = {
  "default": '${path} non è valido.',
  required: '${path} è un campo obbligatorio',
  oneOf: '${path} deve contenere uno dei seguenti valori: ${values}',
  notOneOf: '${path} deve essere diverso dai seguenti valori: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " deve essere un `" + type + "` tipo, " + ("ma il valore finale \xE8: `" + printValue(value, true) + "`") + (isCast ? " (valore originale: `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Se \"null\" \xE8 inteso come un valore vuoto assicurarsi di settare lo schema come" + ' `.nullable()`';
    }

    return msg;
  }
};
var string$5 = {
  length: '${path} deve avere esattamente ${length} caratteri',
  min: '${path} deve avere almeno ${min} caratteri',
  max: '${path} deve avere al massimo ${max} caratteri',
  matches: '${path} deve corrispondere al seguente: "${regex}"',
  email: '${path} deve essere un indirizzo email valido',
  url: '${path} deve essere un URL valido',
  trim: '${path} deve essere una stringa senza spazi iniziali/finali',
  lowercase: '${path} deve essere una stringa in minuscolo',
  uppercase: '${path} deve essere una stringa in maiuscolo'
};
var number$5 = {
  min: '${path} deve essere maggiore o uguale a ${min}',
  max: '${path} deve essere inferiore o uguale a ${max}',
  lessThan: '${path} deve essere inferiore a ${less}',
  moreThan: '${path} deve essere maggiore di ${more}',
  positive: '${path} deve essere un numero positivo',
  negative: '${path} deve essere un numero negativo',
  integer: '${path} deve essere un numero intero'
};
var date$5 = {
  min: '${path} deve essere successiva al ${min}',
  max: '${path} deve essere precedente al ${max}'
};
var _boolean$5 = {};
var object$5 = {
  noUnknown: "${path} contiene delle chiavi non specificate nella forma dell'oggetto"
};
var array$5 = {
  min: '${path} deve avere almeno ${min} elementi',
  max: '${path} non deve avere più di ${max} elementi'
};

var it = {
  __proto__: null,
  mixed: mixed$5,
  string: string$5,
  number: number$5,
  date: date$5,
  boolean: _boolean$5,
  object: object$5,
  array: array$5
};

/*eslint-disable no-template-curly-in-string*/

var mixed$6 = {
  "default": '${path} er ugyldig.',
  required: '${path} er et nødvendig felt',
  oneOf: '${path} må være en av de følgende verdier: ${values}',
  notOneOf: '${path} må ikke være en av de følgende verdier: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " m\xE5 v\xE6re en `" + type + "` typen, " + ("men den endelige verdien var: `" + printValue(value, true) + "`") + (isCast ? " (st\xF8pt fra verdien `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Hvis \"null\" er ment som en tom verdi s\xF8rg for \xE5 markere skjemaet som" + ' `.nullable()`';
    }

    return msg;
  }
};
var string$6 = {
  length: '${path} må være nøyaktig ${length} tegn',
  min: '${path} må være minst ${min} tegn',
  max: '${path} må være mest ${max} tegn',
  matches: '${path} må samsvare med følgende: "${regex}"',
  email: '${path} må være en gyldig e-post',
  url: '${path} må være en gyldig nettadresse',
  trim: '${path} må være en trimmet streng',
  lowercase: '${path} må være i små bokstaver',
  uppercase: '${path} må være i store bokstaver'
};
var number$6 = {
  min: '${path} må være større enn eller lik ${min}',
  max: '${path} må være mindre enn eller lik ${max}',
  lessThan: '${path} må være mindre enn ${less}',
  moreThan: '${path} må være større enn ${more}',
  positive: '${path} må være et positivt tall',
  negative: '${path} må være et negativt tall',
  integer: '${path} må være et heltall'
};
var date$6 = {
  min: '${path} feltet må være senere enn ${min}',
  max: '${path} feltet må være tidligere enn ${max}'
};
var _boolean$6 = {};
var object$6 = {
  noUnknown: '${path} felt kan ikke har nøkler som ikke er spesifisert i objektet form'
};
var array$6 = {
  min: '${path} feltet må ha minst ${min} elementer',
  max: '${path} feltet må ha mindre enn eller lik ${max} elementer'
};

var nb = {
  __proto__: null,
  mixed: mixed$6,
  string: string$6,
  number: number$6,
  date: date$6,
  boolean: _boolean$6,
  object: object$6,
  array: array$6
};

/*eslint-disable no-template-curly-in-string*/

var mixed$7 = {
  "default": '${path} is ongeldig.',
  required: '${path} is een verplicht veld',
  oneOf: '${path} moet één van de volgende waarden zijn: ${values}',
  notOneOf: '${path} mag niet een van de volgende waarden zijn: ${values}: ',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " moet een `" + type + "` zijn, " + ("maar de uiteindelijke waarde was: `" + printValue(value, true) + "`") + (isCast ? " (gegoten uit de waarde `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Als \"null\" is bedoeld als een lege waarde moet u het schema markeren als" + ' `.nullable()`';
    }

    return msg;
  }
};
var string$7 = {
  length: '${path} moet precies ${length} karakters lang zijn',
  min: '${path} moet minimaal ${min} karakters bevatten',
  max: '${path} mag maximaal ${max} karakters bevatten',
  matches: '${path} moet overeenkomen met het volgende: "${regex}"',
  email: '${path} moet een geldig e-mailadres zijn',
  url: '${path} moet een geldige URL zijn',
  trim: '${path} mag geen begin- of eindspaties bevatten',
  lowercase: '${path} mag alleen bestaan uit kleine letters',
  uppercase: '${path} mag alleen bestaan uit hoofdletters'
};
var number$7 = {
  min: '${path} moet groter dan of gelijk zijn aan ${min}',
  max: '${path} moet lager dan of gelijk zijn aan ${max}',
  lessThan: '${path} moet lager zijn dan ${less}',
  moreThan: '${path} moet hoger zijn dan ${more}',
  positive: '${path} moet een positief getal zijn',
  negative: '${path} moet negatief getal zijn',
  integer: '${path} moet een getal zijn'
};
var date$7 = {
  min: '${path} moet later dan ${min} zijn',
  max: '${path} moet eerder dan ${max} zijn'
};
var _boolean$7 = {};
var object$7 = {
  noUnknown: '${path} mag geen waarden bevatten die niet zijn opgegeven in het object'
};
var array$7 = {
  min: '${path} moet ten minste ${min} items bevatten',
  max: '${path} moet minder of gelijk zijn aan ${max} items'
};

var nl = {
  __proto__: null,
  mixed: mixed$7,
  string: string$7,
  number: number$7,
  date: date$7,
  boolean: _boolean$7,
  object: object$7,
  array: array$7
};

/*eslint-disable no-template-curly-in-string*/

var mixed$8 = {
  "default": '${path} é inválido.',
  required: '${path} é um campo obrigatório',
  oneOf: '${path} deve ser um dos seguintes valores: ${values}',
  notOneOf: '${path} não deve ser um dos seguintes valores: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " deve ser um tipo de `" + type + "`, " + ("Mas o valor final foi: `" + printValue(value, true) + "`") + (isCast ? " (Elenco do valor `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Se \"null\" pretender como um valor vazio, certifique-se de marcar o esquema como" + ' `.nullable()`';
    }

    return msg;
  }
};
var string$8 = {
  length: '${path} deve ser exatamente ${length} caracteres',
  min: '${path} deve ser pelo menos ${min} caracteres',
  max: '${path} deve ser no máximo ${max} caracteres',
  matches: '${path} deve corresponder ao seguinte: "${regex}"',
  email: '${path} deve ser um email válido',
  url: '${path} deve ser um URL válido',
  trim: '${path} deve ser uma corda aparada',
  lowercase: '${path} deve ser uma cadeia minúscula',
  uppercase: '${path} deve ser uma cadeia maiúscula'
};
var number$8 = {
  min: '${path} deve ser maior ou igual a ${min}',
  max: '${path} deve ser menor ou igual a ${max}',
  lessThan: '${path} deve ser menor que ${less}',
  moreThan: '${path} deve ser maior que ${more}',
  positive: '${path} deve ser um número positivo',
  negative: '${path} deve ser um número negativo',
  integer: '${path} deve ser um inteiro'
};
var date$8 = {
  min: 'Campo ${path} deve ser mais tarde do que ${min}',
  max: '${path} deve ser mais cedo do que ${max}'
};
var _boolean$8 = {};
var object$8 = {
  noUnknown: 'Campo ${path} não pode ter chaves não especificadas na forma do objeto'
};
var array$8 = {
  min: 'O campo ${path} deve ter pelo menos ${min} itens',
  max: 'O campo ${path} deve ter menos ou igual a itens ${max}'
};

var pt = {
  __proto__: null,
  mixed: mixed$8,
  string: string$8,
  number: number$8,
  date: date$8,
  boolean: _boolean$8,
  object: object$8,
  array: array$8
};

/*eslint-disable no-template-curly-in-string*/

var mixed$9 = {
  "default": '${path} geçerli değildir',
  required: '${path} zorunlu bir alandır',
  oneOf: '${path} bu değerlerden biri olmak zorundadır: ${values}',
  notOneOf: '${path} bu değerlerden biri olmamalıdır.: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + ", `" + type + "`, t\xFCr\xFCnde olmak zorundad\u0131r" + ("fakat son de\u011Fer budur: `" + printValue(value, true) + "`") + (isCast ? "\xE7evirilen orjinal de\u011Fer: ( `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n  \"null\" olarak tan\u0131mlanm\u0131\u015F ise \u015Femay\u0131 \u015Fu \u015Fekilde i\u015Faretledi\u011Finizden emin olun: " + ' `.nullable()`';
    }

    return msg;
  }
};
var string$9 = {
  length: '${path}, ${length} karakter olmalıdır',
  min: '${path} en az ${min} karakter olmalıdır',
  max: '${path} en fazla ${max} karakter olmalıdır',
  matches: '${path}, "${regex}" ile eşleşmelidir',
  email: '${path} geçerli bir email olmalıdır',
  url: '${path} geçerli bir url olmalıdır',
  trim: '${path} kırpılmış olmalıdır',
  lowercase: '${path} küçük harflerden oluşmalıdır',
  uppercase: '${path} büyük harflerden oluşmalıdır'
};
var number$9 = {
  min: '${path}, en az ${min} veya daha fazla hane olmalıdır',
  max: '${path} en fazla ${max} veya daha az hane olmalıdır',
  lessThan: '${path}, ${less} haneden az olmalıdır',
  moreThan: '${path}, ${more} haneden fazla olmalıdır',
  positive: '${path} pozitif bir sayı olmalıdır',
  negative: '${path} negatif bir sayı olmalıdır',
  integer: '${path} bir tamsayı olmalıdır'
};
var date$9 = {
  min: '${path}, ${min} tarihinden ileri bir tarih olmalıdır',
  max: '${path}, ${max} tarihinden önce bir tarih olmalıdır'
};
var _boolean$9 = {};
var object$9 = {
  noUnknown: '${path} alanında nesne olmayan değerler bulunamaz'
};
var array$9 = {
  min: '${path}, en az ${min} eleman içermelidir',
  max: '${path}, en fazla ${max} eleman içermelidir'
};

var tr = {
  __proto__: null,
  mixed: mixed$9,
  string: string$9,
  number: number$9,
  date: date$9,
  boolean: _boolean$9,
  object: object$9,
  array: array$9
};

exports.ar = ar;
exports.de = de;
exports.es = es;
exports.fr = fr;
exports.he = he;
exports.it = it;
exports.nb = nb;
exports.nl = nl;
exports.pt = pt;
exports.tr = tr;
//# sourceMappingURL=yup-locales.cjs.development.js.map
