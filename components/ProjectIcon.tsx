import React from "react";
import { useTranslation } from "react-i18next";
import { IconProps } from "../types";
import { CodeBracketSquareIcon } from "./icons";

type ProjectIconSize = "sm" | "md" | "lg";

interface ProjectIconProps {
  name: string;
  imageUrl?: string;
  iconComponent?: React.ComponentType<IconProps>;
  iconBgColor?: string;
  size?: ProjectIconSize;
  altType?: "preview" | "logo";
  className?: string;
}

const sizeClasses: Record<ProjectIconSize, { container: string; icon: string }> = {
  sm: { container: "w-10 h-10", icon: "w-5 h-5" },
  md: { container: "w-14 h-14", icon: "w-7 h-7" },
  lg: { container: "w-16 h-16", icon: "w-8 h-8" },
};

export const ProjectIcon: React.FC<ProjectIconProps> = ({
  name,
  imageUrl,
  iconComponent: IconComponent,
  iconBgColor,
  size = "md",
  altType = "preview",
  className = "",
}) => {
  const { t } = useTranslation();
  const { container, icon } = sizeClasses[size];
  const alt =
    altType === "logo"
      ? t("common.projectLogo", { name })
      : t("common.projectPreview", { name });

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={`${container} rounded-full object-cover border-2 border-card dark:border-dark-card ${className}`}
      />
    );
  }

  const FallbackIcon = IconComponent || CodeBracketSquareIcon;

  return (
    <div
      className={`${container} flex items-center justify-center rounded-full ${
        iconBgColor || "bg-button-secondary-bg dark:bg-dark-button-secondary-bg"
      } ${className}`}
    >
      <FallbackIcon
        className={`${icon} ${
          iconBgColor ? "text-white" : "text-text-primary dark:text-dark-text-primary"
        }`}
      />
    </div>
  );
};
