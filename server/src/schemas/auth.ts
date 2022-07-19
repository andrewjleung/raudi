import { Static, Type } from '@sinclair/typebox';

export const AuthCode = Type.Object({
  code: Type.String(),
});

export type AuthCodeType = Static<typeof AuthCode>;
