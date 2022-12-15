import type { NextApiRequest, NextApiResponse } from "next";

type HTTPStatus = 200 | 401 | 404;

type EndpointData = {};

type Handler<T> = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<[HTTPStatus, T]> | [HTTPStatus, T];

type Endpoint<
  GetData extends EndpointData,
  PostData extends EndpointData,
  PutData extends EndpointData,
  PatchData extends EndpointData,
  DeleteData extends EndpointData
> = {
  get?: Handler<GetData>;
  post?: Handler<PostData>;
  put?: Handler<PutData>;
  patch?: Handler<PatchData>;
  delete_?: Handler<DeleteData>;
};

export function endpoint<
  GetData extends EndpointData,
  PostData extends EndpointData,
  PutData extends EndpointData,
  PatchData extends EndpointData,
  DeleteData extends EndpointData
>({
  get = () => [404, {} as GetData],
  post = () => [404, {} as PostData],
  put = () => [404, {} as PutData],
  patch = () => [404, {} as PatchData],
  delete_ = () => [404, {} as DeleteData],
}: Endpoint<GetData, PostData, PutData, PatchData, DeleteData>) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    let response: [HTTPStatus, EndpointData];
    switch (req.method) {
      case "GET":
        response = await get(req, res);
        break;
      case "POST":
        response = await post(req, res);
        break;
      case "PUT":
        response = await put(req, res);
        break;
      case "PATCH":
        response = await patch(req, res);
        break;
      case "DELETE":
        response = await delete_(req, res);
        break;
      default:
        response = [404, {}];
    }

    const [status, data] = response;
    res.status(status).json(data);
  };
}
