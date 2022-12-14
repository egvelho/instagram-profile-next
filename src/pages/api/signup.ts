import type { NextApiRequest, NextApiResponse } from "next";
import * as userRepository from "src/user/userRepository";

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    req.body && (req.body.provider = "credentials");
    const results = await userRepository.create(req.body, {
      select: {
        id: true,
      },
    });
    return res.status(200).json(results);
  }

  return res.status(200).json({});
}
