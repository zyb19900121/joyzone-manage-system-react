import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";

const baseUrl = "http://127.0.0.1:3000";

//查询游戏
export async function queryGameList(params) {
  return request(`${baseUrl}/manage/gameReact?${stringify(params)}`);
}
