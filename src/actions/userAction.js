import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  await UserApi.followUser(id, data);
  await dispatch({ type: "FOLLOW_USER", data: id });
};

export const unfollowUser = (id, data) => async (dispatch) => {
  await UserApi.unFollowUser(id, data);
  await dispatch({ type: "UNFOLLOW_USER", data: id });
};
