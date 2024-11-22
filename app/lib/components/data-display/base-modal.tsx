"use client";
import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const BaseModal: FC<{
  show?: boolean;
  onClose?: () => void;
  children: ReactNode;
  position?: "centered" | "side-r";
  className?: string | undefined;
}> = ({
  show = false,
  onClose,
  children,
  className,
  position = "centered",
}) => {
  const modalCenteredClasses = "flex justify-center items-center";
  const modalSideRClasses = "flex justify-end items-center";
  const positionClass =
    position === "centered"
      ? modalCenteredClasses
      : position === "side-r"
        ? modalSideRClasses
        : "";

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    let modalRoot = document.getElementById("modal-root");
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");

    document.body.appendChild(modalRoot);

    return () => {
      if (modalRoot && modalRoot.parentNode) {
        modalRoot.parentNode.removeChild(modalRoot);
      }
    };
  }, []);

  useEffect(() => {
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(10px)" },
  };

  const modalVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed inset-0 z-50 bg-black bg-opacity-10 ${positionClass}`}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={position === "side-r" ? modalVariants : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`bg-background ${position === "side-r" ? "h-screen rounded-l-lg" : "rounded-lg"} ${className}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};

export default BaseModal;
