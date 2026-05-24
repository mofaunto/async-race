interface Props {
    color: string
}

const CarIcon = ({ color }: Props): React.ReactElement => (
    <svg
        className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28"
        fill="none"
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 40L25 20H85L100 35V45H15V40Z"
            fill={color}
            stroke="white"
            strokeWidth="2"
        />

        <circle
            cx="30"
            cy="48"
            fill="#111"
            r="8"
            stroke="white"
            strokeWidth="2"
        />

        <circle
            cx="85"
            cy="48"
            fill="#111"
            r="8"
            stroke="white"
            strokeWidth="2"
        />

        <path d="M35 22H75" stroke="white" strokeWidth="2" />
    </svg>
)

export default CarIcon
