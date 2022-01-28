import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RouteHandlerDescriptor } from './RouteHandlerDescriptor';

export const bodyValidator = (...keys: string[]) => {
  return (target: any, key: string, desc: RouteHandlerDescriptor) => {
    if (!desc.value) return;

    Reflect.defineMetadata(MetadataKeys.validator, keys, desc.value, key);
  };
};
