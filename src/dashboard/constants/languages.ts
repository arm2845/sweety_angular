export enum Languages {
    ENGLISH = 1,
    ARMENIAN = 2,
    RUSSIAN = 3,
}

export interface Language {
    id: number;
    name: string;
    displayName: string;
    code: string;
}

export const LanguagesData: Language[] = [
    {
        id: Languages.ENGLISH,
        name: 'en',
        displayName: 'LANGUAGES.ENGLISH',
        code: 'name_en',
    },
    {
        id: Languages.ARMENIAN,
        name: 'hy',
        displayName: 'LANGUAGES.ARMENIAN',
        code: 'name_hy',
    },
    {
        id: Languages.RUSSIAN,
        name: 'ru',
        displayName: 'LANGUAGES.RUSSIAN',
        code: 'name_ru',
    }
]
