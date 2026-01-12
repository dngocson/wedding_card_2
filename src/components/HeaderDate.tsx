import { motion, type Variants } from "motion/react";
import { imageMap } from "@/imageMap";

const HeaderDate = () => {
	const containerVariant: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};

	return (
		<motion.div
			className="flex flex-col items-center gap-1"
			variants={containerVariant}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			<motion.div className="flex flex-col items-center gap-1">
				<motion.p>quyết định</motion.p>
				<motion.p>bên nhau trọn đời</motion.p>
				<motion.p>save the date</motion.p>
				<motion.p>12.10.2025</motion.p>
				<motion.div className="h-90 w-70 overflow-hidden">
					<img
						src={imageMap.image_9}
						alt="date_img"
						className="h-full w-full object-cover object-bottom"
					/>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default HeaderDate;
