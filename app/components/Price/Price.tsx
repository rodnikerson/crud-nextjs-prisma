import Image from "next/image";

export default function Price({ price }: { price: string }) {
    const monetaryIcons = {
        CHEAP: ["/assets/money-plus.svg", "/assets/money-minus.svg", "/assets/money-minus.svg"],
        REGULAR: ["/assets/money-plus.svg", "/assets/money-plus.svg", "/assets/money-minus.svg"],
        EXPENSIVE: ["/assets/money-plus.svg", "/assets/money-plus.svg", "/assets/money-plus.svg"]
    };

    const icons = (monetaryIcons as { [key: string]: string[] })[price] || [];

    return (
        <div>
            {icons.map((monetaryIcon, index) => (
                <Image key={index} src={monetaryIcon} alt="Money Icon" width={20} height={20} />
            ))}
        </div>
    )
}