import type { NextApiRequest, NextApiResponse } from 'next';
import { setCors } from "@utils/utils";
import { push_create } from "@utils/push";
import { is_account, is_valid_key, is_valid_account } from "@utils/getters";

/**
 * @openapi
 * /api/create:
 *   post:
 *     tags:
 *       - Create
 *     description: Create account using public key as active & owner permission.
 *     parameters:
 *     - name: chain
 *       in: query
 *       required: true
 *       description: "EOSIO chain selection"
 *       schema:
 *         type: string
 *         enum: [ kylin ]
 *         default: kylin
 *     - name: account
 *       in: query
 *       required: true
 *       description: "account to be created (EOSIO account & must be 12 characters)"
 *       schema:
 *         example: myaccount123
 *         type: string
 *         pattern: '^[a-z1-5\.]{12}$'
 *     - name: key
 *       in: query
 *       required: true
 *       description: "EOSIO public key to be used as active/owner permission"
 *       schema:
 *         example: EOS51Dz2VmHEPiXQpE5tmY6ctuQDrgfQFhWzcY1HKsEcSSCtMCUqq
 *         type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message
 *                   example: "ok"
 *                 transaction_id:
 *                   type: string
 *                   description: Transaction ID
 *                   example: "0c1e3953260edbb3000f899b787ee291f00536f43fac6575d64d759ceffb9b3b"
 */
export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
  setCors(res);

  // params
  const chain = String(req.query.chain);
  const account = String(req.query.account);
  const key = String(req.query.key);

  try {
    // validation
    if ( !chain ) throw '[chain] query is required';
    if ( !account ) throw '[account] query is required';
    if ( !key ) throw '[key] query is required';
    if ( key == "EOS51Dz2VmHEPiXQpE5tmY6ctuQDrgfQFhWzcY1HKsEcSSCtMCUqq" ) throw `[key] cannot use default example`;
    if ( !is_valid_key( key ) ) throw `[key=${key}] is invalid`;
    if ( account.length != 12 ) throw `[account] must be 12 characters`;
    if ( !is_valid_account( account ) ) throw `[account=${account}] is invalid`;
    if ( await is_account( account, chain ) ) throw `[account=${account}] account already exists`;

    // push transaction
    const transaction_id = await push_create(account, key, chain);

    // response
    return res.status(200).json({ message: "ok", transaction_id })

    // error handling
  } catch (err: any) {
    const error = err.message || err;
    return res.status(400).json({ error })
  }
}
