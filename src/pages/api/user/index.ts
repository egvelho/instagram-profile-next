import { endpoint } from "src/endpoint";
import { getServerSession } from "src/auth/getServerSession";
import * as userRepository from "src/user/userRepository";

export default endpoint({
  async get(req, res) {
    const session = await getServerSession(req, res);
    const user = await userRepository.findById(session?.user.userId as number, {
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
    });
    return [200, user as userRepository.User];
  },
});
