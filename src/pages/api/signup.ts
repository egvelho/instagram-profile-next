import { endpoint } from "src/endpoint";
import { allowedProviders } from "src/auth/allowedProviders";
import * as userRepository from "src/user/userRepository";

export default endpoint({
  async post(req, res) {
    req.body && (req.body.provider = allowedProviders.credentials);
    const results = await userRepository.create(req.body, {
      select: {
        id: true,
      },
    });
    return [200, results];
  },
});
