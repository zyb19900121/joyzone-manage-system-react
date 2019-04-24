import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";
import { baseUrl } from "@/utils/global";

//查询游戏
export async function queryGameList(params) {
  return request(`${baseUrl()}/manage/gameReact?${stringify(params)}`);
}

//添加游戏
export async function addGame(params) {
	console.log('params: ', params);
  return request(`${baseUrl()}/manage/gameReact`, {
    method: "POST",
    body: params
  });
}

//删除游戏
export async function removeGame(params) {
  return request(`${baseUrl()}/manage/gameReact/${restFormat(params)}`, {
    method: "DELETE",
    body: {}
  });
}
