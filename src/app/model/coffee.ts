export type FormatType  ='beans' | 'ground' | 'k-pod' | undefined
export type RoastType = 'light' |'medium'|'medium-dark'| 'dark'| undefined

export interface Coffee{
    id: number;
    active : boolean;
    roaster: string;
    variety: string;
    size : number;
    roast : RoastType;
    format : FormatType;
    grind : number;
    origin: string[];
    singleOrigin : boolean;
    tastingNotes : string;
}