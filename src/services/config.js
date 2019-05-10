import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";
import { baseUrl } from "@/utils/global";

//查询游戏类型列表
export async function queryTypeList(params) {
  return request(`${baseUrl()}/manage/gameTypeReact?${stringify(params)}`);
}
//添加游戏类型
export async function addType(params) {
  return request(`${baseUrl()}/manage/gameTypeReact`, {
    method: "POST",
    body: params
  });
}
//根据id查询游戏类型
export async function selectType(params) {
  return request(`${baseUrl()}/manage/gameTypeReact/${restFormat(params)}`);
}
//编辑游戏类型
export async function updateType(params) {
  const id = params.id;
  delete params.id;
  return request(`${baseUrl()}/manage/gameTypeReact/${id}`, {
    method: "PUT",
    body: params
  });
}
//删除游戏类型
export async function removeType(params) {
  return request(`${baseUrl()}/manage/gameTypeReact/${restFormat(params)}`, {
    method: "DELETE",
    body: {}
  });
}

//查询游戏公司列表
export async function queryCompanyList(params) {
  return request(`${baseUrl()}/manage/gameCompanyReact?${stringify(params)}`);
}
//删除游戏公司
export async function removeCompany(params) {
  return request(`${baseUrl()}/manage/gameCompanyReact/${restFormat(params)}`, {
    method: "DELETE",
    body: {}
  });
}
//添加游戏公司
export async function addCompany(params) {
  return request(`${baseUrl()}/manage/gameCompanyReact`, {
    method: "POST",
    body: params
  });
}
//编辑游戏公司
export async function updateCompany(params) {
  const id = params.id;
  delete params.id;
  return request(`${baseUrl()}/manage/gameCompanyReact/${id}`, {
    method: "PUT",
    body: params
  });
}
//根据id查询游戏公司
export async function selectCompany(params) {
  return request(`${baseUrl()}/manage/gameCompanyReact/${restFormat(params)}`);
}
