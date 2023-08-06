import Api from "./api";

export const getApi = async (url) => Api.get(url);
export const postApi = async (url, formData) => Api.post(url, formData);
export const patchApi = async (url, formData) => Api.patch(url, formData);
export const putApi = async (url, formData) => Api.put(url, formData);
export const deleteApi = async (url) => Api.delete(url);
