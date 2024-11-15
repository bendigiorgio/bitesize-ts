import React, {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  forwardRef,
} from "react";

type FixedForwardRef = <T, P = unknown>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = forwardRef as FixedForwardRef;

export type satisfy<base, t extends base> = t;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

const UnwrappedComponent = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends TAs ? "a" : TAs>,
    "as"
  >,
  ref: ForwardedRef<unknown>
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};

const ComplexComponent = fixedForwardRef(UnwrappedComponent);

const Test = () => {
  return (
    <>
      <ComplexComponent as="div" href=""></ComplexComponent>
      <ComplexComponent as="a" href=""></ComplexComponent>
      <ComplexComponent as="button" href=""></ComplexComponent>
    </>
  );
};

export { ComplexComponent, Test };
