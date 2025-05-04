import Svg, { Path } from 'react-native-svg';
interface SvgImageProps {
    size?: number
    color: string
    url: string,
}
const SVG = ({ size = 20, color, url }: SvgImageProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 17 16" fill="none">
            <Path d={url} fill={color} />
        </Svg>
    )


}

export default SVG;