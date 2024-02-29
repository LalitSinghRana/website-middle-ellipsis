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
						<div className="flex flex-col w-full whitespace-nowrap border-[2px] border-solid p-2">
							<MiddleEllipsis>
								Ellipsis text in the middle automatically when component resize.
							</MiddleEllipsis>
						</div>
						{/* <div className="flex flex-col w-full">
							<MiddleEllipsis>
								WoRkS WiTh MiXeD CaSeS ToO, EvEn ThOuGh ChArAcTeR WiDtHs ArE
								DiFfErEnT.
							</MiddleEllipsis>
						</div>
						<span className={cn("flex flex-col w-full", robotoMono.className)}>
							<MiddleEllipsis>
								Works with different font families too. Mono, Sarif, etc.
							</MiddleEllipsis>
						</span>
						<div className="flex flex-col w-full">
							<Badge>
								<MiddleEllipsis>
									WoRkS WiTh MiXeD CaSeS ToO, EvEn ThOuGh ChArAcTeR WiDtHs ArE
									DiFfErEnT.
								</MiddleEllipsis>
							</Badge>
						</div>
						<Badge>Badge</Badge>
						<div className="flex gap-2 w-full">
							<span className="flex w-full">
								Ellipsis text in the middle automatically when component resize.
							</span>
							<span className="flex w-full">
								Ellipsis text in the middle automatically when component resize.
							</span>
						</div> */}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
