import { z } from "zod";

export const weddingInviteParamsSchema = z.object({
	groomName: z.string().optional().default("Văn Bách"),
	brideName: z.string().optional().default("Khánh Ly"),
	inviteeNames: z
		.array(z.string())
		.optional()
		.default(["Bạch Long", "Sa Tăng"]),
});

export type weddingParams = z.infer<typeof weddingInviteParamsSchema>;
