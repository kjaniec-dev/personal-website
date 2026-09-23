import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CopyEmailButton from "@/components/CopyEmailButton";

afterEach(cleanup);

describe("CopyEmailButton", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		Object.assign(navigator, {
			clipboard: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
		});
	});

	it("renders copy button with initial state", () => {
		render(<CopyEmailButton email="test@example.com" />);
		const button = screen.getByRole("button", {
			name: /copy.*test@example\.com/i,
		});
		expect(button).toBeDefined();
		expect(button.textContent).toContain("Copy email");
	});

	it("copies email to clipboard and displays copied confirmation", async () => {
		render(<CopyEmailButton email="test@example.com" />);
		const button = screen.getByRole("button", {
			name: /copy.*test@example\.com/i,
		});

		await act(async () => {
			fireEvent.click(button);
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
			"test@example.com",
		);
		expect(button.textContent).toContain("Copied!");

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(button.textContent).toContain("Copy email");
	});
});
