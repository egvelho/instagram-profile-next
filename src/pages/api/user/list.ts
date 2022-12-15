import { endpoint } from "src/endpoint";
import * as userRepository from "src/user/userRepository";

export default endpoint({
  async get(req, res) {
    const users = await userRepository.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
      },
    });
    return [200, users];
  },
});
