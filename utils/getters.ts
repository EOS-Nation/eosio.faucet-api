import { core } from "utils/config"
import { PublicKey, Name } from "@greymass/eosio"

export async function get_account(account: string, chain: string) {
    return core[chain].v1.chain.get_account(account);
}

export async function is_account(account: string, chain:string ) {
    try {
        await get_account(account, chain);
        return true;
    } catch (e) {
        return false;
    }
}

export function is_valid_key(key: string) {
    try {
        PublicKey.from(key);
        return true;
    } catch (e) {
        return false;
    }
}

export function is_valid_account(account: string) {
    try {
        Name.from(account);
        return true;
    } catch (e) {
        return false;
    }
}