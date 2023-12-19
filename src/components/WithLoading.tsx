import React from "react";
import { Skeleton, SkeletonProps } from "@material-ui/lab";

interface WithLoadingProps extends SkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const WithLoading = ({ isLoading, children, ...props }: WithLoadingProps) => {
  return isLoading ? <Skeleton {...props} /> : <>{children}</>;
};

export default WithLoading;
