# lnd-invoicer

[![Gitter chat](https://badges.gitter.im/aynik/lnd-invoicer.png)](https://gitter.im/aynik/lnd-invoicer)

> A service that requests invoices from lnd and serves them publicly.

## Requirments

- Node.js
- Mongodb

## Install

```
git clone https://github.com/aynik/lnd-invoicer.git
cd lnd-invoicer
npm install
```

## Configuration

See `env.example`. Environment variables can be set by either putting them in a `.env` file or by passing them to the process as usual. The prefix for public environment variables is `APP_`.

## Usage (Development)

```
npm run dev
```

## Usage (Production)

```
npm run build
npm run start
```

## Contributing

PRs accepted.

## License

MIT
