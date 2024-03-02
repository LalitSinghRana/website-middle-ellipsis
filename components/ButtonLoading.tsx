import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
	return (
		<Button variant="destructive" size="xs" className="mr-2">
			<RotateCw className="mr-2 h-4 w-4 animate-spin" />
			Button
		</Button>
	);
}
