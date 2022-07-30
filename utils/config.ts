import { APIClient, PrivateKey } from "@greymass/eosio"

if ( !process.env.PRIVATE_KEY ) throw new Error("[env.PRIVATE_KEY] is required");
export const PRIVATE_KEY = PrivateKey.from(process.env.PRIVATE_KEY)

export const core: {[chain: string]: APIClient} = {
    kylin: new APIClient({ url: "https://kylin.api.eosnation.io" }),
    jungle: new APIClient({ url: "https://jungle.api.eosnation.io" }),
    eos: new APIClient({ url: "https://eos.api.eosnation.io" }),
    wax: new APIClient({ url: "https://wax.api.eosnation.io" }),
    telos: new APIClient({ url: "https://telos.api.eosnation.io" }),
}
