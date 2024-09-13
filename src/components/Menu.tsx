import React, {FC} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {RouteInterface} from "../models/route.interface";
import {cn} from "../services/utils";

interface IMenuProps {
    routes: RouteInterface[];
}

const Menu: FC<IMenuProps> = ({routes}) => {
    const loc = useLocation();

    function isActive(path: string) {
        const p = path !== "/" ? `${path}/` : path;
        return p === "/" ? loc.pathname === p : `${loc.pathname}/`.startsWith(p);
    }

    return (
        <div className="p-3">
            <div className="text-lg text-sky-700">Menu</div>
            <div className="flex flex-col gap-2 mt-4">
                {
                    routes?.map((route, index) => {
                        return (
                            <NavLink key={index}
                                     to={route.path}
                                     className={cn("text-sm", {
                                         "text-sky-700 underline": isActive(route.path),
                                     })}>
                                {route.label}
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Menu;
