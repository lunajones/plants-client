import {StringConverter} from './string-converter';
import {BooleanConverter} from './boolean-converter';
import {NumberConverter} from './number-converter';


export function InputConverter(converter?: (value: any) => any) {
  return (target: Object, key: string) => {
    if (converter === undefined) {
      const metadata = (<any>Reflect).getMetadata('design:type', target, key);
      if (metadata === undefined || metadata === null) {
        throw new Error('The reflection metadata could not be found.');
      }
      if (metadata.name === 'String') {
        converter = StringConverter;
      } else if (metadata.name === 'Boolean') {
        converter = BooleanConverter;
      } else if (metadata.name === 'Number') {
        converter = NumberConverter;
      } else {
        throw new Error('There is no converter for the given property type ' + metadata.name + '.');
      }
    }

    const definition = Object.getOwnPropertyDescriptor(target, key);
    if (definition) {
      Object.defineProperty(target, key, {
        get: definition.get,
        set: newValue => {
          definition.set(converter(newValue));
        },
        enumerable: true,
        configurable: true
      });
    } else {
      Object.defineProperty(target, key, {
        get: function () {
          return this['__' + key];
        },
        set: function (newValue) {
          this['__' + key] = converter(newValue);
        },
        enumerable: true,
        configurable: true
      });
    }
  };
}
