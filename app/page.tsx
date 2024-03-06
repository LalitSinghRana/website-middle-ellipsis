"use client";

import { Roboto_Mono } from "next/font/google";
import {
	MiddleEllipsis,
	MultipleMiddleEllipsis,
} from "@/components/MiddleEllipsis";
import { ButtonLoading, ButtonIcon } from "@/components/ButtonLoading";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

const Resizable = () => (
	<ResizablePanel minSize={30}>
		<div className="flex flex-col gap-4 w-full h-full p-4">
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis>
					Ellipsis text in the middle automatically when component resize
				</MiddleEllipsis>
			</div>
			<Separator />
			<div className="w-full px-8 bg-primary">
				<div className="flex flex-col w-full relative whitespace-nowrap bg-secondary px-4">
					<MiddleEllipsis>
						When the parent divs have padding and margin
					</MiddleEllipsis>
				</div>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis>
					MiXeD CaSe EvEn ThOuGh ChArAcTeR WiDtHs ArE DiFfErEnT
				</MiddleEllipsis>
			</div>
			<Separator />
			<div
				className={cn(
					"flex flex-col w-full relative whitespace-nowrap",
					robotoMono.className,
				)}
			>
				<MiddleEllipsis>
					Different font families. Mono, Serifs, etc
				</MiddleEllipsis>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis className="text-5xl">
					Different font sizes
				</MiddleEllipsis>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge>
					<MiddleEllipsis>
						Parent's width depend on the child for width
					</MiddleEllipsis>
				</Badge>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge>
					<ButtonLoading />
					<ButtonIcon />
					<MiddleEllipsis>Extra elements inside parent</MiddleEllipsis>
				</Badge>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge variant="outline">
					<Badge variant="destructive">
						<Badge variant="secondary">
							<Badge>
								<MiddleEllipsis>
									Nested deep inside multiple divs
								</MiddleEllipsis>
							</Badge>
						</Badge>
					</Badge>
				</Badge>
			</div>
			<Separator />
			<div className="flex w-full relative whitespace-nowrap">
				<MultipleMiddleEllipsis>
					<Badge className="mr-2">
						<MiddleEllipsis>Multiple</MiddleEllipsis>
					</Badge>
					<Badge className="mr-2">
						<MiddleEllipsis>Elements</MiddleEllipsis>
					</Badge>
					<Badge>
						<MiddleEllipsis>Sharing</MiddleEllipsis>
					</Badge>
				</MultipleMiddleEllipsis>
			</div>
			<Separator />
		</div>
	</ResizablePanel>
);

export default function Home() {
	return (
		<div className="flex w-screen h-screen justify-center items-center">
			<ResizablePanelGroup direction="horizontal">
				<Resizable />
				<ResizableHandle withHandle />
				<Resizable />
			</ResizablePanelGroup>
		</div>
	);
}
