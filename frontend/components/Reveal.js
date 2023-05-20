import { useInView } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

export default function Reveal({
    children,
    initial,
    animate,
    exit,
    delay = 0,
    duration = 0.9,
    style = {},
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : undefined}
            exit={exit ?? initial}
            transition={{
                duration: duration,
                ease: [0.17, 0.55, 0.55, 1],
                delay: delay,
            }}
            style={style}
        >
            {children}
        </motion.div>
    );
}
