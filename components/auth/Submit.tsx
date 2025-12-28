import {Button} from "@/components/ui/button";

type SubmitProps = React.ComponentProps<typeof Button>;

export function Submit({children, ...others}: SubmitProps) {
    return <Button type="submit" {...others}>{children}</Button>
}