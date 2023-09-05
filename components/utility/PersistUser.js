"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useGetUserQuery } from "@/store/features/api/authAPI";
import { setUser, setUserLoading } from "@/store/features/authSlice";
import axiosInstance from "@/utils/axiosInstance";

// The purpose of this component to get the logged user again after page load
const PersistUser = () => {
  // const { isLoading, data: userData, isSuccess } = useGetUserQuery();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isLoading) {
  //     dispatch(setUserLoading(true));
  //     return;
  //   }

  //   if (userData?.status && isSuccess) {
  //     //   console.log(userData.data);
  //     dispatch(setUser(userData.data));
  //   } else {
  //     dispatch(setUserLoading(false));
  //   }
  // }, [dispatch, isLoading, userData, isSuccess]);

  useEffect(() => {
    const getUser = async () => {
      dispatch(setUserLoading(true));
      try {
        const response = await axiosInstance.get(`user`);
        // console.log(response.data.data);
        dispatch(setUser(response.data.data));
        dispatch(setUserLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setUser(null));
        dispatch(setUserLoading(false));
      }
    };
    getUser();
  }, [dispatch]);

  return null;
};

export default PersistUser;
