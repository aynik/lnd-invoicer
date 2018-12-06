const grpcLib = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const { Metadata, loadPackageDefinition } = grpcLib
const {
  createFromMetadataGenerator,
  combineChannelCredentials,
  createSsl
} = grpcLib.credentials

class Grpc {
  constructor (objects) {
    this.objects = objects
  }

  async connect (protoFileName, address, macaroon, cert) {
    const metadata = new Metadata()
    metadata.add('macaroon', macaroon)
    const macaroonCreds = createFromMetadataGenerator((_, done) => {
      done(null, metadata)
    })
    const sslCreds = createSsl(cert)
    const credentials = combineChannelCredentials(sslCreds, macaroonCreds)
    const protoLoaderOpts = {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
    const { lnrpc } = await new Promise((resolve, reject) => {
      protoLoader.load(protoFileName, protoLoaderOpts).then((packageDefinition) => {
        resolve(loadPackageDefinition(packageDefinition))
      }).catch(reject)
    })
    return new lnrpc.Lightning(address, credentials)
  }
}

module.exports = Grpc
