export interface DataType {
    vehicles: Vehicle[];
}

interface Icons {
    small: string;
    medium: string;
    large: string;
}

interface Type {
    name: string;
    title: string;
    icons: {
        default: string;
    };
}

interface Nation {
    name: string;
    title: string;
    color: string;
    icons: Icons;
}

export interface Vehicle {
    title: string;
    description: string;
    icons: {
        large: string;
        medium: string;
    };
    level: number;
    type: Type;
    nation: Nation;
}

export interface ApiResponse {
    vehicles: Vehicle[];
}

export interface Uniq {
    nation: string[];
    class: string[];
    lvl: number[];
}
