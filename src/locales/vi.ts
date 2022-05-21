/*eslint-disable no-template-curly-in-string*/

import printValue from '../util/printValue';
import { LocaleObject, FormatErrorParams } from 'yup';

// Based on https://github.com/jquense/yup/blob/2973d0a/src/locale.js
export const mixed: LocaleObject['mixed'] = {
  default: '${path} không hợp lệ.',
  required: '${path} là một trường bắt buộc',
  oneOf: '${path} phải là một trong những giá trị sau: ${values}',
  notOneOf: '${path} Không được là một trong các giá trị sau: ${values}',
  notType: ({ path, type, value, originalValue }: FormatErrorParams) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg =
      `${path} phải là một \`${type}\`, ` +
      `Nhưng giá trị cuối cùng là: \`${printValue(value, true)}\`` +
      (isCast
        ? ` (đúc từ giá trị \`${printValue(originalValue, true)}\`).`
        : '.');

    if (value === null) {
      msg +=
        `\n Nếu "null" được dự định là một giá trị trống, hãy chắc chắn đánh dấu lược đồ là` +
        ' `.nullable()`';
    }

    return msg;
  },
};

export const string: LocaleObject['string'] = {
  length: '${path} phải chính xác ${length} ký tự',
  min: '${path} phải ít nhất ${min} ký tự',
  max: '${path} nhất phải có nhiều nhất ${max}',
  matches: '${path} phải phù hợp như sau: "${regex}"',
  email: '${path} phải là một email hợp lệ',
  url: '${path} phải là một URL hợp lệ',
  trim: '${path} phải là một chuỗi được cắt',
  lowercase: '${path} phải là chuỗi chữ thường',
  uppercase: '${path} phải là chuỗi trường hợp trên',
};

export const number: LocaleObject['number'] = {
  min: '${path} phải lớn hơn hoặc bằng ${min}',
  max: '${path} phải nhỏ hơn hoặc bằng ${max}',
  lessThan: '${path} phải nhỏ hơn ${less}',
  moreThan: '${path} phải lớn hơn ${more}',
  positive: '${path} phải là một số dương',
  negative: '${path} phải là số âm',
  integer: '${path} phải là một số nguyên',
};

export const date: LocaleObject['date'] = {
  min: '${path} Trường phải muộn hơn ${min}',
  max: '${path} Trường phải sớm hơn ${max}',
};

export const boolean: LocaleObject['boolean'] = {};

export const object: LocaleObject['object'] = {
  noUnknown:
    '${path} Trường không thể có các khóa không được chỉ định trong hình dạng đối tượng',
};

export const array: LocaleObject['array'] = {
  min: '${path} Trường phải có ít nhất ${min} các mục',
  max: '${path} Trường phải có ít hơn hoặc bằng các mục ${max}',
};
