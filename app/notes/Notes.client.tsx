'use client'

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";



export default function NotesClient() {  
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(inputValue, 300)

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const { data, isSuccess } = useQuery({
        queryKey: ['notes', debouncedValue, page],
        queryFn: () => fetchNotes(debouncedValue, page),
        placeholderData: keepPreviousData,
    })

    const onSearch = (value: string) => {
        setInputValue(value);
        setPage(1);
    };
    
return <>
<div className={css.app}>
    <div className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={onSearch}/>
        
        {isSuccess && data.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
            
        <button className={css.button} onClick={onOpen}>Create note +</button>
    </div>
</div>
{isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
{isOpen && <NoteModal onClose={onClose}>
    <NoteForm onClose={onClose} />
</NoteModal>}
</>
}

