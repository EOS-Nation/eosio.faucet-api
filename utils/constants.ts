export const version = "0.1.0";
export const title = "EOSIO Faucet";
export const description = "The EOSIO Faucet provides an interface that assists in the automation of distributing tokens on an EOSIO testnet.";
export const homepage = "https://github.com/EOS-Nation/eosio.faucet";

export const RPC_NODE_URL: {[key: string]: string} = {
    'kylin': 'https://kylin.api.eosnation.io',
    'jungle4': 'https://jungle4.api.eosnation.io',
    'eos': 'https://eos.api.eosnation.io',
    'wax': 'https://wax.api.eosnation.io',
    'telos': 'https://telos.api.eosnation.io',
}

export const RPC_CHAIN_ID: {[key: string]: string} = {
    'kylin': '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    'jungle4': '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
    'eos': 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    'wax': '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    'telos': '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
}