export type FormatType  ='Beans' | 'Ground' | 'K-pod' | undefined
export type RoastType = 'Light' |'Medium'|'Medium-dark'| 'Dark'| undefined
export type VarietyType = 'Arabica' | 'Robusta'| 'Excelsa' | 'Liberica' | undefined

export interface Coffee {
    id: number;
    active: boolean;
    roaster: string;
    variety: VarietyType;
    size: number;
    roast: RoastType;
    format: FormatType;
    grind: number;
    origin: string[];
    singleOrigin: boolean;
    tastingNotes: string;
}