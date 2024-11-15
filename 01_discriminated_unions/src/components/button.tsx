import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & (
  | ({
      as: "button";
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

const CustomButton = (props: ButtonProps) => {
  if (props.as === "button") {
    return <button {...props}></button>;
  }
  if (props.as === "a") {
    return <a {...props}></a>;
  }
};

export { CustomButton };
