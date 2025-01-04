import { motion } from 'framer-motion';

interface WritingAnimationProps {
  paragraph: string;
}

const paragraphVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const WritingAnimation: React.FC<WritingAnimationProps> = ({ paragraph }) => {
  return (
    
      <motion.p
        variants={paragraphVariants}
        initial="hidden"
        animate="visible"
      >
        {paragraph.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>
   
  );
};

export default WritingAnimation;