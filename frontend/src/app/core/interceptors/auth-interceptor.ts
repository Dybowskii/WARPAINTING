import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { event } from '@ngrx/signals/events';
import { camelize, camelizeKeys, decamelizeKeys } from 'humps';
import { map } from 'rxjs/internal/operators/map';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isTranslationRequest = req.url.includes('/assets/i18n/');

  if (isTranslationRequest) {
    return next(req);
  }

  if (req.body instanceof FormData) {
    return next(req);
  }

  const modifiedReq = req.clone({
    body: req.body ? decamelizeKeys(req.body) : req.body,
  });

  return next(modifiedReq).pipe(
    map((event) => {
      if (event instanceof HttpResponse && event.body) {
        return event.clone({ body: camelizeKeys(event.body) });
      }
      return event;
    }),
  );
};
