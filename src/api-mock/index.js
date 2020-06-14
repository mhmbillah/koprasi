import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ApiRoutes from "@/api-mock/routes";

const routes = ApiRoutes;

const mock = new MockAdapter(axios);
const methodMap = {
  GET: "onGet",
  POST: "onPost",
  PUT: "onPut",
  DELETE: "onDelete",
  PATCH: "onPatch"
};

const applyMock = function(data) {
  data.forEach(d => {
    const params = [d.url];
    params.push(d.param_values);
    mock[methodMap[d.method]](...params).reply(d.code || 200, d.response);
  });
};

applyMock(routes);

export default routes;
