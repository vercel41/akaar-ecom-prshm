import { fetchData } from "@/lib/fetch-data";
import IntroSlider from "./IntroSlider";

const Intro = async () => {
	const { data: sliders = [] } = await fetchData({
		api: "sliders",
	});
	return <IntroSlider sliders={sliders} />;
};

export default Intro;
