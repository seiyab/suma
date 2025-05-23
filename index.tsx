import React, { type ReactNode, type ComponentType, Fragment } from "react";

type WithChildren<C extends ReactNode> = { children: C };

type Builder<C extends ReactNode> = {
	add: {
		<NewC extends ReactNode>(
			Component: ComponentType<WithChildren<NewC>>,
		): Builder<NewC>;
		<NewC extends ReactNode, P>(
			Component: ComponentType<P & WithChildren<NewC>>,
		): Builder<NewC>;
	};
	component: () => ComponentType<WithChildren<C>>;
};

export function suma(): Builder<ReactNode> {
	type Layer = [ComponentType<WithChildren<ReactNode>>];
	return _suma<ReactNode>([[Fragment]]);

	function _suma<C extends ReactNode>(layers: Layer[]): Builder<C> {
		return {
			add: <NewC extends ReactNode>(
				Component: ComponentType<WithChildren<NewC>>,
			) => _suma(layers.concat([[Component] as Layer])),

			component: () => {
				return Suma;
			},
		};
		function Suma({ children }: WithChildren<C>) {
			return (
				<>
					{layers
						.slice()
						.reverse()
						.reduce(
							// eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
							(acc, [Component]): any => (
								<Component>{acc}</Component>
							),
							children,
						)}
				</>
			);
		}
	}
}
