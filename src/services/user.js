import request from "@/utils/request";

import { baseUrl } from "@/utils/global";

export async function query() {
  return request("/api/users");
}

export async function queryCurrent() {
  return request("/api/currentUser");
}

//获取当前用户信息
export async function getCurrentUserInfo() {
  return request(`${baseUrl()}/manage/getCurrentUserInfo`);
}
