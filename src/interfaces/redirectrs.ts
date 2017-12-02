export interface Redirectrs {
    id?: string,
    title: string,
    description: string,
    clicks?: number,
    main_link?: number,
    links?: Links
}

export interface Links extends Array<string> {}
