export type FormatType  ='Beans' | 'Ground' | 'K-pod' | undefined
export type RoastType = 'Light' |'Medium'|'Medium-dark'| 'Dark'| undefined

export interface Coffee {
    id: number;
    active: boolean;
    roaster: string;
    variety: string;
    size: number;
    roast: RoastType;
    format: FormatType;
    grind: number;
    origin: string[];
    singleOrigin: boolean;
    tastingNotes: string;
}