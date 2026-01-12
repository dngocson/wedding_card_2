import { weddingInviteParamsSchema } from "@/schema/urlSchema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: LandingPage,
	validateSearch: weddingInviteParamsSchema,
});

function LandingPage() {
	const { brideName, groomName, inviteeNames } = Route.useSearch();
	console.log({ brideName, groomName, inviteeNames });
	return <div></div>;
}
