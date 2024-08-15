import { Params } from 'nestjs-pino';
export const loggerConfig: Params = {
  pinoHttp: {
    customProps: (req, res) => ({
      context: 'HTTP',
    }),
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
      },
    },
    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 400 || err) {
        return 'error';
      }
      return 'info';
    },
  },
};
