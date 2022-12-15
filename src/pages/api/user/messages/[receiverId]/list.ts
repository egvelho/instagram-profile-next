import { endpoint } from "src/endpoint";
import { getServerSession } from "src/auth/getServerSession";
import { receiverIdSchema } from "src/message/schemas/receiverIdSchema";
import * as messageService from "src/message/messageService";

export default endpoint({
  async get(req, res) {
    const receiverIdValidation = await receiverIdSchema.safeParseAsync(
      req.query.receiverId
    );
    if (receiverIdValidation.success) {
      const session = await getServerSession(req, res);
      const senderId = session?.user.userId as number;
      const receiverId = receiverIdValidation.data;
      const messages = await messageService.getLatestMessages({
        senderId,
        receiverId,
      });

      return [200, messages];
    }
    return [404, {}];
  },
});
