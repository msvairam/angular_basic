import { Tab } from '../../lib-view/tab-form/tab-form.model';

export interface Profile {
    firstname: string
    lastname: string
    email: string
}

export interface Interest {
    topics: string[]
    newsletter: boolean
    frequency: string
}

export interface Settings {
    theme: string
    language: string,
    notification: boolean
}

export interface UserForm {
    profile: Profile,
    interest: Interest
    settings: Settings
}

export type userTabs = Tab[];