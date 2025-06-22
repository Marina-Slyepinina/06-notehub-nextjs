
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
    params: Promise<{ id: string }>;
};
  
const NoteDetails = async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
};

export default NoteDetails;


// Реалізуйте сторінковий компонент NoteDetails у маршруті /notes/[id] як SSR-компонент, де заздалегідь виконується prefetch (попереднє завантаження даних через TanStack Query) з гідратацією кеша.