import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RouteHandlerDescriptor } from './RouteHandlerDescriptor';

const routeBinder = (method: string) => {
  return (path: string) => {
    return (target: any, key: string, desc: RouteHandlerDescriptor) => {
      if (!desc || !desc.value) return;

      Reflect.defineMetadata(MetadataKeys.path, path, desc.value, key);
      Reflect.defineMetadata(MetadataKeys.method, method, desc.value, key);
    };
  };
};

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const patch = routeBinder(Methods.patch);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
