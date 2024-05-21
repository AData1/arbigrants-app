import {
    StackIcon,
    StopIcon,
    Cross1Icon,
    ShadowOuterIcon,
    ComponentInstanceIcon,
    MixIcon,
    AvatarIcon,
    FileTextIcon,
    ImageIcon
} from "@radix-ui/react-icons"

export const categories = [
    {
        value: "DeFi",
        label: "DeFi",
        icon: ComponentInstanceIcon,
    },
    {
        value: "Gaming",
        label: "Gaming",
        icon: MixIcon,
    },
    {
        value: "Infra",
        label: "Infra",
        icon: StackIcon,
    },
    {
        value: "RWA",
        label: "RWA",
        icon: FileTextIcon,
    },
    {
        value: "Social",
        label: "Social",
        icon: AvatarIcon,
    },
    {
        value: "NFT",
        label: "NFT",
        icon: ImageIcon,
    },
    {
        value: "Other",
        label: "Other",
        icon: ShadowOuterIcon,
    },
]