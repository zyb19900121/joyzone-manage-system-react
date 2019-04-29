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

//上传游戏封面
export async function uploadGameCover(params) {
  return request(`${baseUrl()}/manage/fileUpload`, {
    method: "UPLOAD",
    body: params
  });
}

// let param = new FormData(); //创建form对象
//     if (data.type) {
//       param.append("type", data.type);
//     }
//     param.append("file", data.file); //通过append向form对象添加数据

//     let config = {
//       method: "post",
//       url,
//       baseURL: baseURL,
//       // data: qs.stringify(data),
//       timeout: 30000,
//       responseType: "json",
//       headers: { "Content-Type": "multipart/form-data" }
//     };
//     return axios.post(url, param, config);

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
