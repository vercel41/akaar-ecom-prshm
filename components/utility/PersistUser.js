"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserLoading } from "@/store/features/authSlice";
import axiosInstance from "@/utils/axiosInstance";

// The purpose of this component to get the logged user again after page load
const PersistUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      dispatch(setUserLoading(true));
      try {
        const response = await axiosInstance.get(`user`);
        dispatch(setUser(response.data.data));
        dispatch(setUserLoading(false));
      } catch (error) {
        // console.log(error);
        dispatch(setUser(null));
        dispatch(setUserLoading(false));
      }
    };
    getUser();
  }, [dispatch]);

  return null;
};

export default PersistUser;
