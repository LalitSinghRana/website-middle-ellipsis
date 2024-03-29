import { Roboto_Mono } from "next/font/google";
import MiddleEllipsis from "@/components/MiddleEllipsis";
import { ButtonLoading, ButtonIcon } from "@/components/ButtonLoading";
import { ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const ResizableEllipsisPanel = () => (
	<ResizablePanel minSize={30}>
		<div className="flex flex-col gap-4 w-full h-full p-4">
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis.Span>
					Ellipsis text in center automatically when element resize
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis.Span ellipsisSymbol=" [ - - - - - ] ">
					You can pass any custom separator string of your choice
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div className="w-full px-8 bg-secondary">
				<div className="flex flex-col w-full px-4 my-2 relative whitespace-nowrap bg-primary text-primary-foreground font-semibold">
					<MiddleEllipsis.Span>
						Account for parent div having padding and margin
					</MiddleEllipsis.Span>
				</div>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis.Span>
					MiXeD CaSe, EvEn ThOuGh ChArAcTeR WiDtHs ArE vAsTlIy DiFfErEnT
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div
				className={cn(
					"flex flex-col w-full relative whitespace-nowrap",
					robotoMono.className,
				)}
			>
				<MiddleEllipsis.Span>
					Different font families. Mono, Serifs, etc
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis.Span className="text-5xl">
					Different font sizes
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge>
					<MiddleEllipsis.Span>
						Parent's width depend on the child, no issue.
					</MiddleEllipsis.Span>
				</Badge>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge>
					<ButtonLoading />
					<ButtonIcon />
					<MiddleEllipsis.Span>
						Extra elements inside parent
					</MiddleEllipsis.Span>
				</Badge>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge variant="outline">
					<Badge variant="destructive">
						<Badge variant="secondary">
							<Badge>
								<MiddleEllipsis.Span>
									Deep inside multiple elements without widths
								</MiddleEllipsis.Span>
							</Badge>
						</Badge>
					</Badge>
				</Badge>
			</div>
			<Separator />
			<div className="flex w-full relative whitespace-nowrap">
				<MiddleEllipsis.BoundingDiv>
					<Badge className="mr-2">
						<MiddleEllipsis.Span>Multiple</MiddleEllipsis.Span>
					</Badge>
					<Badge className="mr-2">
						<MiddleEllipsis.Span>Elements</MiddleEllipsis.Span>
					</Badge>
					<Badge>
						<MiddleEllipsis.Span>Sharing</MiddleEllipsis.Span>
					</Badge>
				</MiddleEllipsis.BoundingDiv>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<MiddleEllipsis.Span lineLimit={3}>
					Want text to wrap to [x] number of lines before truncation start. Got
					that covered too.
				</MiddleEllipsis.Span>
			</div>
		</div>
	</ResizablePanel>
);
