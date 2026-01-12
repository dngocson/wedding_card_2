import { useSearch } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";

const HeaderText = () => {
	const { brideName, groomName } = useSearch({ from: "/" });

	const containerVariant: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};

	const groomNameVariant: Variants = {
		hidden: { opacity: 0, x: 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 1 },
		},
	};

	const symbolVariant: Variants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 1 },
		},
	};

	const brideNameVariant: Variants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 1 },
		},
	};

	return (
		<div className="-translate-x-1/2 absolute bottom-4 left-[45%] mb-3 min-w-[60%] rounded-md py-4 font-fontFive text-[85px] text-white leading-18">
			<motion.div
				className="flex flex-col items-center gap-1"
				variants={containerVariant}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<motion.div className="self-start" variants={groomNameVariant}>
					<h2>{groomName.split(" ")[1]}</h2>
				</motion.div>

				<motion.div variants={symbolVariant}>
					<h2>$</h2>
				</motion.div>

				<motion.div className="self-end" variants={brideNameVariant}>
					<h2>{brideName.split(" ")[1]}</h2>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default HeaderText;
