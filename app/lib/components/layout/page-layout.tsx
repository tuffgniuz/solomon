import { FC, ReactNode } from "react";

import Navbar from "../navigation/navbar";

const PageLayout: FC<{
  children: ReactNode;
  className?: string | undefined;
}> = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <div className={`${className}`}>{children}</div>
    </>
  );
};

export default PageLayout;
