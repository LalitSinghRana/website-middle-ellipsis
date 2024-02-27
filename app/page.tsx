"use client";

import { MiddleEllipsis } from "middle-ellipsis";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";

const longText =
	"t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t ";
const longText2 =
	"tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt";
const longText3 =
	"a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a ";
const longText4 =
	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
// const longText =
// 	"This is a very long long long text. This is a very long long long text. This is a very long long long text. This is a very long long long text.";

export default function Home() {
	return (
		<div className="flex w-screen h-screen justify-center items-center">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel>
					<span id="myElement">One</span>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<div className="flex flex-col gap-4 w-full h-full relative p-4">
						<MiddleEllipsis>{longText}</MiddleEllipsis>
						<MiddleEllipsis>{longText2}</MiddleEllipsis>
						<MiddleEllipsis>{longText3}</MiddleEllipsis>
						<MiddleEllipsis>{longText4}</MiddleEllipsis>
						<Badge>Badge</Badge>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
