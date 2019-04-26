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
  console.log("params: ", params);
  return request(`${baseUrl()}/manage/gameReact`, {
    method: "POST",
    body: params
  });
}

//更新游戏
export async function updateGame(params) {
  console.log("params: ", params);
  const id = params.id;
  delete params.id;
  return request(`${baseUrl()}/manage/gameReact/${id}`, {
    method: "PUT",
    body: params
  });
}

//根据ID获取游戏详情
export async function getGameDetail(params) {
  return request(`${baseUrl()}/manage/gameReact/${restFormat(params)}`);
}

//删除游戏
export async function removeGame(params) {
  return request(`${baseUrl()}/manage/gameReact/${restFormat(params)}`, {
    method: "DELETE",
    body: {}
  });
}
