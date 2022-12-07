import type { NextApiRequest, NextApiResponse } from "next";

export default function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.status(200).json(req.body);
  }

  res.status(200).json({});
}
