import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RouteHandlerDescriptor } from './RouteHandlerDescriptor';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: RouteHandlerDescriptor) {
    if (!desc.value) return;

    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, desc.value, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      desc.value,
      key
    );
  };
}
