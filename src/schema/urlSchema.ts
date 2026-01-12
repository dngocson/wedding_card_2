import { z } from "zod";

export const weddingInviteParamsSchema = z.object({
	page: z.string().optional().default("1"),
	brideName: z.string().optional().default("Ngộ Không"),
	groomName: z.string().optional().default("Bát Giới"),
	inviteeNames: z
		.array(z.string())
		.optional()
		.default(["Bạch Long", "Sa Tăng"]),
});

export type weddingParams = z.infer<typeof weddingInviteParamsSchema>;
