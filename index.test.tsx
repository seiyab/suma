import { describe, expect, it } from "vitest";
import { suma } from ".";
import { Fragment } from "react";
import { render, screen } from "@testing-library/react";

describe("", () => {
	it("smoke", () => {
		const Ctx = suma() //
			.add(Fragment)
			.add(Fragment)
			.add(Fragment)
			.component();
		render(
			<Ctx>
				<div>Hello</div>
			</Ctx>,
		);

		expect(screen.getByText("Hello")).toBeInTheDocument();
	});
});
