import type MIMETypes from "mime/types/standard.js";

type FilterMIME<Type extends string> = {
  [K in keyof typeof MIMETypes as K extends `${Type}/${string}` ? K : never]: (typeof MIMETypes)[K];
};

export type QueryMIMEType<Type extends string> = keyof FilterMIME<Type>;
