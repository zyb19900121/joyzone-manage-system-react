import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";
import { baseUrl } from "@/utils/global";

//查询游戏图集
export async function queryGalleryList(params) {
  return request(`${baseUrl()}/manage/gameGalleryReact?${stringify(params)}`);
}
