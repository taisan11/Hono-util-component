import type { Manifest } from 'vite'
import type {} from 'vite/types/ImportMeta'
import type { JSX } from 'hono/jsx/jsx-runtime'

type Props = {script: string} & JSX.IntrinsicElements['link']

export const ensureTrailngSlash = (path: string) => {
    return path.endsWith('/') ? path : path + '/'
}

/**
 * Only HonoX or vite mode
 * No support dist-chunk
 */
export default function WithUnoCSS(props: Props): JSX.Element {
    const { script,...rest } = props
    if (import.meta.env.PROD) {
        let manifest: Manifest | undefined = undefined
        {
            const MANIFEST = import.meta.glob<{ default: Manifest }>('/dist/.vite/manifest.json', {
                eager: true,
            })
            for (const [, manifestFile] of Object.entries(MANIFEST)) {
                if (manifestFile['default']) {
                    manifest = manifestFile['default']
                    break
                }
            }
        }
        console.log(manifest![script.replace(/^\//, '')]?.css?.[0])
        const cssfile = manifest![script.replace(/^\//, '')]?.css?.[0]
        if (script.startsWith('/')) {
            return (
                <link
                    href={`${ensureTrailngSlash(import.meta.env.BASE_URL)}${cssfile}`}
                    rel="stylesheet"
                    {...rest}
                ></link>
            )
        }
        return manifest ? (<link href={cssfile} rel="stylesheet" {...rest}></link>) : <></>
    }
    return <></>
}