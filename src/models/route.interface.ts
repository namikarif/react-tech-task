import {FC} from "react";

export interface RouteInterface {
    path: string;
    component: FC;
    label?: string;
    hide?: boolean;
}
