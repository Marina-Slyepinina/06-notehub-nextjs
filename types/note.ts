type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'

export interface Note {
    id: number,
    title: string,
    content: string,
    tag: Tag,
    createdAt: string
}

export interface NewNote {
    title: string,
    content: string,
    tag: Tag,
}
