"use client";

import React from "react";

type Props = {
	children?: React.ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div className="bg-gray-200 min-h-screen pt-[5rem]">
			<div>{children}</div>
		</div>
	);
}
