import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "AUTH_FAIL" });
    return error.response.data;
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS" });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "AUTH_FAIL" });
    return error.response.data;
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
