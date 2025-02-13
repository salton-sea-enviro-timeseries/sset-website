import React from "react";
import { Skeleton, SkeletonProps } from "@mui/material";

interface WithLoadingProps extends SkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const WithLoading = ({
  isLoading = true,
  children,
  ...props
}: WithLoadingProps) => {
  return isLoading ? <Skeleton {...props} /> : <>{children}</>;
};

export default WithLoading;
