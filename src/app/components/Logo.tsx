const LOGO_IMG = "/logo_i.png"
const LOGO_TEXT = "/logo_t.png"

export function LogoImg(
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) {
  return <img src={LOGO_IMG} {...props}></img>
}

export function LogoText(
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) {
  return <img src={LOGO_TEXT} {...props}></img>
}
