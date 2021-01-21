declare namespace jest {
	interface Matchers<R> {
		toHaveTextContent: (htmlElement: string) => object;
		toHaveClass: (htmlElement: string) => object;
		toBeInTheDOM: () => void;
	}

	interface Expect {
		toHaveTextContent: (htmlElement: string) => object;
		toHaveClass: (htmlElement: string) => object;
		toBeInTheDOM: () => void;
	}
}
