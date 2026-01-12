import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";

type SubmitProps = React.ComponentProps<typeof Button>;

export function Submit({children, ...others}: SubmitProps) {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending} {...others}>{children}</Button>
}