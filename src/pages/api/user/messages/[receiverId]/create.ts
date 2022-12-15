import { endpoint } from "src/endpoint";
import { getServerSession } from "src/auth/getServerSession";
import { receiverIdSchema } from "src/message/schemas/receiverIdSchema";
import * as messageRepository from "src/message/messageRepository";

export default endpoint({
  async post(req, res) {
    const receiverIdValidation = await receiverIdSchema.safeParseAsync(
      req.query.receiverId
    );
    if (receiverIdValidation.success) {
      const session = await getServerSession(req, res);
      const senderId = session?.user.userId as number;
      const receiverId = receiverIdValidation.data;
      const results = await messageRepository.create({
        message: req.body?.message,
        senderId,
        receiverId,
      });
      return [200, results];
    }
    return [404, {}];
  },
});
