import type {JSX,JSXNode} from "hono/jsx";
import type {StringLiteralUnion} from "hono/utils/types"
import type {BaseMime} from "hono/utils/mime"
import {createElement} from "hono/jsx"
import type { Hono,Env } from "hono";

// Based hono/jsx
interface AnchorHTMLAttributes extends JSX.HTMLAttributes {
    download?: string | boolean | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: StringLiteralUnion<BaseMime> | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
}
type HTMLAttributeReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
type HTMLAttributeAnchorTarget = StringLiteralUnion<"_self" | "_blank" | "_parent" | "_top">;

export function createAtag<E extends Env>(hono: Hono<E>):(props:AnchorHTMLAttributes)=>JSXNode {
    //動的ルートが怖いから除外する。
    const routes = hono.routes.map(route => route.path).filter(path => path.indexOf(":") == -1 && path.indexOf("*") == -1);
    type RoutesType = (typeof routes)[number];
    type RoutesAnchorHTMLAttributes = AnchorHTMLAttributes & { href?: RoutesType };
    return (props:RoutesAnchorHTMLAttributes)=>{return createElement("a",props,props.children)};
}