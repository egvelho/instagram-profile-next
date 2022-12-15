import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from "next";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export function getServerSession(
  req: NextApiRequest | GetServerSidePropsContext["req"],
  res: NextApiResponse | GetServerSidePropsContext["res"]
) {
  return unstable_getServerSession(req, res, authOptions);
}
