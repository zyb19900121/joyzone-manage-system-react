import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";

const baseUrl = "http://127.0.0.1:3000";

//查询游戏类型
export async function queryTypeList(params) {
  return request(`${baseUrl}/manage/gameTypeReact?${stringify(params)}`);
}
//删除游戏类型
export async function removeType(params) {
  return request(`${baseUrl}/manage/gameTypeReact/${restFormat(params)}`, {
    method: "DELETE",
    body: {}
  });
}

//查询游戏公司
export async function queryCompanyList(params) {
  return request(`${baseUrl}/manage/gameCompanyReact?${stringify(params)}`);
}
//删除游戏公司
export async function removeCompany(params) {
  return request(`${baseUrl}/manage/gameCompanyReact/${restFormat(params)}`, {
    method: "DELETE",
    body: {}
  });
}
