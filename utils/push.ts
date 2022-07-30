
import { core, PRIVATE_KEY } from "./config"
import { Transaction, Struct, Name, Action, SignedTransaction, PublicKey } from "@greymass/eosio"

@Struct.type('send')
class Send extends Struct {
    @Struct.field('name') to!: Name
}

@Struct.type('create')
class Create extends Struct {
    @Struct.field('name') account!: Name
    @Struct.field('public_key') key!: PublicKey
}

export async function push_send( to: string, chain: string ) {
    const action = Action.from({
        authorization: [ { actor: 'eosnationftw', permission: 'faucet' } ],
        account: 'eosio.faucet',
        name: 'send',
        data: Send.from({ to }),
    })
    return push_transaction( [action], chain );
}

export async function push_create( account: string, key: string, chain: string ) {
    const action = Action.from({
        authorization: [ { actor: 'eosnationftw', permission: 'faucet' } ],
        account: 'eosio.faucet',
        name: 'create',
        data: Create.from({ account, key }),
    })
    return push_transaction( [action], chain );
}

export async function push_transaction( actions: Action[], chain: string ) {
    const info = await core[chain].v1.chain.get_info();
    const header = info.getTransactionHeader();
    const transaction = Transaction.from({
        ...header,
        actions,
    })
    const signature = PRIVATE_KEY.signDigest(transaction.signingDigest(info.chain_id))
    const signedTransaction = SignedTransaction.from({
        ...transaction,
        signatures: [signature],
    })
    try {
        const { transaction_id } = await core[chain].v1.chain.push_transaction(signedTransaction)
        return transaction_id;
    } catch (e: any) {
        const error = e?.error?.details[0].message.replace("assertion failure with message: ", "");
        throw Error(error || e);
    }
}