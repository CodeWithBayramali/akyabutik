import axios, { ParamsSerializerOptions } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { signIn } from "next-auth/react";
import { RequestOptions } from "types";

export const getGuardRequest = async (
  requestParameter = RequestParameter,
  id: string
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `${requestParameter.action}` : ""
  }${id ? `/${id}` : ""}`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const getRequest = async (
  requestParameter = RequestParameter
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `/${requestParameter.id}` : ""}`;
  return await axios.get(url, {
    params: requestParameter.params,
  }).catch(err => {
    if(err.status === 401) {
      deleteCookie('next-auth.session-token')
      return signIn()
    }
  })
};

export const getGuardParamsRequest = async (
  requestParameter = RequestParameter
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `${requestParameter.id}` : ""}`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: requestParameter.params,
  }).catch(err => {
    if(err.status === 401) {
      deleteCookie('next-auth.session-token')
      return signIn()
    }
  })
};

export const postRequest = async (
  requestParameter = RequestParameter,
  body:object
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `${requestParameter.id}` : ""}`;
  return await axios.post(url, body);
};

export const postJsonGuardRequest = async (
  requestParameter = RequestParameter,
  body: object,
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `${requestParameter.id}` : ""}`;
  return await axios.post(url, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const postGuardRequest = async (
  requestParameter = RequestParameter,
  body: object
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `${requestParameter.id}` : ""}`;
  return await axios.post(url, body, {
    headers: { Authorization: `Bearer ${accessToken}`,"Content-Type": "multipart/form-data" },
  });
};

export const putGuardRequest = async (
  requestParameter = RequestParameter,
  body: object
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }`;
  return await axios.put(url, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteGuardRequest = async (
  requestParameter = RequestParameter,
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `/${requestParameter.id}` : ""}`;
  return await axios.delete(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const RequestParameter: RequestOptions = {
  id: "",
  controller: "",
  action: "",
  params: Object
};