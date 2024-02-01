import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { siteConfig } from "@/config/site";
import axiosInstance from "@/lib/axios-instance";
import { setUser } from "@/store/features/authSlice";
import { useUpdateProfileMutation } from "@/store/features/api/authAPI";

const useProfileUpdate = () => {
	const dispatch = useDispatch();
	const [updateProfile] = useUpdateProfileMutation();
	const { user } = useSelector((state) => state.auth);

	const handleUserUpdate = async (data) => {
		try {
			const formData = new FormData();
			formData.append("image", data?.profileImageFile || user?.image);
			formData.append("name", data.name);
			formData.append("birth_date", data.birth_date);
			formData.append("gender", data.gender);
			formData.append("email", data.email);
			formData.append("phone", user?.phone);
			formData.append("alt_phone_no", data?.alt_phone_no);
			formData.append("address", data.address);
			formData.append("city", data.city);
			formData.append("country", siteConfig.phone.country);

			await updateProfile(formData).unwrap(); //updating user profile
			// Handle the successful response if necessary
			const updatedUser = await axiosInstance.get(`user`);
			dispatch(setUser(updatedUser.data.data));
			toast.success("Profile updated successfully!");
			return true;
		} catch (error) {
			// Handle the error if necessary
			toast.error("Failed to update profile");
			console.error(error);
			return false;
		}
	};

	return {
		handleUserUpdate,
	};
};

export default useProfileUpdate;

// Example usage:
// const updateUser = async (data) => {
//   const isSuccess = await handleUserUpdate(data, profileImageFile);
//   if (isSuccess) {
//     setEditMode(false);
//   }
// };
