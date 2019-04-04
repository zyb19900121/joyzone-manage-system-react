import { stringify } from "qs";
import restFormat from "@/utils/restfulParamsFormat";
import request from "@/utils/request";

const baseUrl = "http://127.0.0.1:3000";

/**
 * 新增接口
 */

//获取短信验证码
export async function getCaptcha(params) {
  // return request(`${baseUrl}/api/log?${stringify(params)}`)
  return request(`${baseUrl}/getCaptcha`, {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

//查看用户名是否被注册
export async function checkExist(params) {
  // return request(`${baseUrl}/api/log?${stringify(params)}`)
  return request(`${baseUrl}/checkExist`, {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

//查看手机号是否被注册
export async function checkMobileExist(params) {
  // return request(`${baseUrl}/api/log?${stringify(params)}`)
  return request(`${baseUrl}/checkMobileExist`, {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

//用户注册
export async function register(params) {
  // return request(`${baseUrl}/api/log?${stringify(params)}`)
  return request(`${baseUrl}/register`, {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

//用户登陆
export async function login(params) {
  return request(`${baseUrl}/loginForReact`, {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

//查询评论列表
export async function queryCommentList(params) {
  return request(`${baseUrl}/manage/gameCommentReact?${stringify(params)}`);
}

//查询访问日志
export async function queryLogList(params) {
  return request(`${baseUrl}/manage/log?${stringify(params)}`);
}

//删除访问日志
export async function removeLogRecords(params) {
  // return request(`${baseUrl}/api/log?${stringify(params)}`)
  return request(`${baseUrl}/api/log/${restFormat(params)}`, {
    method: "DELETE",
    body: {
      // ...params,
      // method: 'delete',
    }
  });
}

/************************************/

export async function queryProjectNotice() {
  return request("/api/project/notice");
}

export async function queryActivities() {
  return request("/api/activities");
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request("/api/rule", {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}

export async function addRule(params) {
  return request("/api/rule", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: "POST",
    body: {
      ...params.body,
      method: "update"
    }
  });
}

export async function fakeSubmitForm(params) {
  return request("/api/forms", {
    method: "POST",
    body: params
  });
}

export async function fakeChartData() {
  return request("/api/fake_chart_data");
}

export async function queryTags() {
  return request("/api/tags");
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request("/api/profile/advanced");
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: "POST",
    body: {
      ...restParams,
      method: "delete"
    }
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: "POST",
    body: {
      ...restParams,
      method: "post"
    }
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: "POST",
    body: {
      ...restParams,
      method: "update"
    }
  });
}

export async function fakeAccountLogin(params) {
  return request("/api/login/account", {
    method: "POST",
    body: params
  });
}

export async function fakeRegister(params) {
  return request("/api/register", {
    method: "POST",
    body: params
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
