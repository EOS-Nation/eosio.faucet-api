import type { NextApiRequest, NextApiResponse } from 'next'
import { setCors } from "@utils/utils"
import { push_send } from "@utils/push"
import { is_account, is_valid_account } from "@utils/getters"

/**
 * @openapi
 * /api/send:
 *   post:
 *     tags:
 *       - Send
 *     description: Send tokens to receiver account.
 *     parameters:
 *     - name: chain
 *       in: query
 *       required: true
 *       description: "EOSIO chain selection"
 *       schema:
 *         type: string
 *         enum: [ kylin ]
 *         default: kylin
 *     - name: to
 *       in: query
 *       required: true
 *       description: "Receiver account (EOSIO account)"
 *       schema:
 *         type: string
 *         pattern: '^[a-z1-5\.]{1,12}$'
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
 *       '429':
 *         description: Rate Limit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Rate limit
 *                   example: "faucet::send: must wait 24 hours"
 */
export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
  setCors(res);

  // params
  const chain = String(req.query.chain);
  const to = String(req.query.to);

  try {
    // validation
    if ( !chain ) throw '[chain] query is required';
    if ( !to ) throw '[to] query is required';
    if ( !is_valid_account( to ) ) throw `[to=${to}] is invalid`;
    if ( !await is_account( to, chain ) ) throw `[to=${to}] account does not exists`;

    // push transaction
    const transaction_id = await push_send(to, chain);

    // response
    return res.status(200).json({ message: "ok", transaction_id })

    // error handling
  } catch (err: any) {
    const error = err.message || err;
    return res.status(400).json({ error })
  }
}
