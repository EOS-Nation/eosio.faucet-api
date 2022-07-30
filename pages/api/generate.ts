import type { NextApiRequest, NextApiResponse } from 'next';
import { setCors } from "@utils/utils";
import { PrivateKey } from "@greymass/eosio";

/**
 * @openapi
 * /api/generate:
 *   get:
 *     tags:
 *       - Generate
 *     description: Generate EOSIO private/public key
 *     parameters:
 *     - name: type
 *       in: query
 *       description: "EOSIO public key type"
 *       schema:
 *         type: string
 *         enum: [ K1, R1 ]
 *         default: K1
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 private_key:
 *                   type: string
 *                   description: EOSIO Private Key
 *                   example: "5K5DJDMAPZDbEyEhSnPMbEmP6yRjjBuy4NsukDCpi8iomRnxYLA"
 *                 public_key:
 *                   type: string
 *                   description: EOSIO K1 Public Key
 *                   example: "PUB_K1_8Lw8Liu8FZU3uXZgC2T8KnEkPdtrnWVeV6Cu9T2KaLHHH8tgno"
 *                 legacy_public_key:
 *                   type: string
 *                   description: EOSIO Legacy Public Key
 *                   example: "EOS8Lw8Liu8FZU3uXZgC2T8KnEkPdtrnWVeV6Cu9T2KaLHHHZjeYM"
 */
export default async function handler( req: NextApiRequest, res: NextApiResponse<any> ) {
  setCors(res);

  // params
  const type = String(req.query.type) || "K1";

  try {
    // validation
    if ( !type ) throw '[type] query is required';

    // response
    const priv = PrivateKey.generate(type);

    if ( type == "K1") {
      return res.status(200).json({
        legacy_public_key: priv.toPublic().toLegacyString(),
        public_key: priv.toPublic().toString(),
        private_key: priv.toWif()
      })
    }
    else if ( type == "R1") {
      return res.status(200).json({
        public_key: priv.toPublic().toString(),
        private_key: priv.toString()
      })
    }

    // error handling
  } catch (err: any) {
    const error = err.message || err;
    return res.status(400).json({ error })
  }
}
