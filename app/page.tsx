"use client";

import { Roboto_Mono } from "next/font/google";
import { MiddleEllipsis } from "@/components/MiddleEllipsis";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

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
						<MiddleEllipsis>
							a quick brown fox jumps over a lazy dog.
						</MiddleEllipsis>
						<MiddleEllipsis>
							"WoRkS WiTh MiXeD CaSeS ToO, EvEn ThOuGh ChArAcTeR WiDtHs ArE DiFfErEnT."
						</MiddleEllipsis>
						<span className={cn("flex flex-col w-full", robotoMono.className)}>
							<MiddleEllipsis>
								Works with different font families too. Mono, Sarif, etc.
							</MiddleEllipsis>
						</span>
						<Badge>Badge</Badge>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
