import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";
import { baseUrl } from "@/utils/global";

//查询游戏
export async function queryGameList(params) {
  return request(`${baseUrl()}/manage/gameReact?${stringify(params)}`);
}
