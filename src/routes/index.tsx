import { createFileRoute } from "@tanstack/react-router";
import HeaderDate from "@/components/HeaderDate";
import HeaderText from "@/components/HeaderText";
import { imageMap } from "@/imageMap";
import { weddingInviteParamsSchema } from "@/schema/urlSchema";

export const Route = createFileRoute("/")({
	component: LandingPage,
	validateSearch: weddingInviteParamsSchema,
});

function LandingPage() {
	return (
		<div className="flex flex-col">
			<div className="relative">
				<div className="relative">
					<img className="" src={imageMap.image_27} alt="headerImage" />
					<div className="absolute inset-0 bg-black opacity-25" />
					<HeaderText />
				</div>
			</div>
			<div className="relative h-full w-full">
				<HeaderDate />
			</div>
		</div>
	);
}
